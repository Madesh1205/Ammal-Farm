import { useState, useEffect } from 'react';
import { db, auth, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FaBell, FaSignOutAlt, FaGoogle, FaClock, FaUser, FaPhone, FaCalendarAlt, FaTag } from 'react-icons/fa';

interface VisitRequest {
  id: string;
  name: string;
  phone: string;
  date: string;
  type: string;
  createdAt: Timestamp;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<VisitRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Test connectivity on mount
    import('../lib/firebase').then(({ testFirestoreConnection }) => {
      testFirestoreConnection().then(status => {
        if (status === 'UNAVAILABLE') {
          setError('Could not connect to Firebase. If you just deployed, please wait a few minutes or check your internet connection.');
        }
      });
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Sign-in error details:", err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups or try opening the app in a new tab.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError(`This domain is not authorized in Firebase. Please add "${window.location.hostname}" to your Firebase Console under Authentication > Settings > Authorized Domains.`);
      } else {
        setError(err.message || 'Failed to sign in. Please check if your domain is authorized in Firebase Console.');
      }
    }
  };

  useEffect(() => {
    if (!user || user.email !== 'madesh1205@gmail.com') return;

    const q = query(collection(db, 'visitRequests'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VisitRequest[];

      // Check for new requests to trigger notification
      if (requests.length > 0 && newRequests.length > requests.length) {
        const added = newRequests[0];
        if (Notification.permission === 'granted') {
          new Notification('New Farm Visit Request!', {
            body: `${added.name} requested a visit for ${added.date}`,
            icon: '/logo.jpeg'
          });
        }
      }
      
      setRequests(newRequests);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'visitRequests');
    });

    return () => unsubscribe();
  }, [user, requests.length]);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    }
  };

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading Security...</div>;

  if (!user || user.email !== 'madesh1205@gmail.com') {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-border p-12 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary mx-auto rounded-full flex items-center justify-center mb-6">
            <FaSignOutAlt size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Admin Access Only</h2>
          <p className="text-stone-500 text-sm mb-8">Please sign in with the authorized administrator email to view requests.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-medium leading-relaxed rounded">
              {error}
            </div>
          )}

          <button 
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all"
          >
            <FaGoogle size={16} /> Sign In with Google
          </button>

          <p className="mt-8 text-[10px] text-stone-400 uppercase tracking-widest">
            Trouble logging in? <br className="md:hidden" /> 
            Open the app in a new tab using the "Open App" button above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4 uppercase">Admin Dashboard</h1>
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-stone-500">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Connected</span>
              <span>•</span>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="flex gap-4">
            {!notificationsEnabled && 'Notification' in window && (
              <button 
                onClick={requestNotificationPermission}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
              >
                <FaBell /> Enable Alerts
              </button>
            )}
            <button 
              onClick={logout}
              className="px-6 py-3 border border-border bg-white text-stone-500 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {requests.length === 0 ? (
            <div className="bg-white border border-border p-20 text-center">
              <p className="text-stone-400 font-mono text-xs uppercase tracking-widest italic">No requests recorded yet.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="bg-white border border-border group hover:border-primary transition-all duration-300">
                <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-border">
                  <div className="p-6">
                    <p className="text-[10px] font-mono text-stone-400 uppercase mb-2">Visitor</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                        <FaUser size={12} />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{request.name}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-mono text-stone-400 uppercase mb-2">Contact</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-[#25D366]">
                        <FaPhone size={12} />
                      </div>
                      <a href={`tel:+91${request.phone}`} className="font-bold text-sm tracking-tight hover:text-accent transition-colors underline decoration-stone-200 underline-offset-4">
                        +91 {request.phone}
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-mono text-stone-400 uppercase mb-2">Desired Visit</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                        <FaCalendarAlt size={12} />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{request.date}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-mono text-stone-400 uppercase mb-2">Inquiry Type</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                        <FaTag size={12} />
                      </div>
                      <span className="font-bold text-sm tracking-tight uppercase border-b-2 border-primary/20 pb-0.5">{request.type}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-stone-50 flex justify-between items-center border-t border-border">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                    <FaClock size={10} />
                    Submitted: {request.createdAt?.toDate().toLocaleString()}
                  </div>
                  <a 
                    href={`https://wa.me/91${request.phone}?text=${encodeURIComponent(`Hi ${request.name}, this is from Ammal Farm. We received your request for a ${request.type} visit on ${request.date}.`)}`}
                    target="_blank"
                    className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    Reply via WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
