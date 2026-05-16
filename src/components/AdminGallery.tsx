import { useState, useEffect } from 'react';
import { db, storage, handleFirestoreError, OperationType } from '../lib/firebase';
import { ref, deleteObject } from 'firebase/storage';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { FaCloudUploadAlt, FaTrash, FaPlayCircle, FaImage, FaSpinner, FaImages, FaInfoCircle } from 'react-icons/fa';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  description: string;
  createdAt?: Timestamp;
}

export default function AdminGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MediaItem[];
      setItems(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'media');
    });
    return () => unsubscribe();
  }, []);

  const STATIC_DEFAULTS: MediaItem[] = [
    { id: 's1', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg', type: 'image', description: 'Our healthy farm herd' },
    { id: 's2', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg', type: 'image', description: 'Nellore Judipi Buck' },
    { id: 's3', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/salem%20black1.jpg', type: 'image', description: 'Salem Black livestock' },
    { id: 's4', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/country-chicken.jpg', type: 'image', description: 'Free-range country chicken' },
    { id: 's5', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/ducks.jpg', type: 'image', description: 'Farm ducks in habitat' },
    { id: 's6', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/black-chicken.jpg', type: 'image', description: 'Kadaknath poultry' },
    { id: 's7', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/turkey.jpg', type: 'image', description: 'Seasonal Turkeys' },
  ];

  const handleAddLink = async () => {
    if (!url) return;
    setUploading(true);
    
    try {
      await addDoc(collection(db, 'media'), {
        url,
        type: mediaType,
        description,
        createdAt: serverTimestamp(),
      });
      
      setUploading(false);
      setUrl('');
      setDescription('');
      alert('Link added successfully!');
    } catch (error: any) {
      handleFirestoreError(error, OperationType.WRITE, 'media');
      setUploading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm('Delete this media permanently?')) return;
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'media', item.id));
      
      // Delete from Storage if it's a firebase URL
      if (item.url.includes('firebasestorage')) {
        const storageRef = ref(storage, item.url);
        await deleteObject(storageRef);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'media');
    }
  };

  return (
    <div className="bg-white border border-border">
      <div className="p-8 border-b border-border bg-stone-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FaImages size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Gallery Management</h2>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-widest mt-1">Add or remove media from public displays</p>
          </div>
        </div>

        <div className="bg-white border border-border p-6 rounded-lg max-w-2xl">
          <div className="flex items-start gap-4 mb-4 text-stone-600">
            <span className="mt-1 flex-shrink-0 text-accent"><FaInfoCircle /></span>
            <p className="text-xs leading-relaxed font-medium">
              Paste URLs from your <strong className="text-primary italic">Vercel Blob Storage</strong> (e.g., https://.../images/...) to add them to the farm gallery. Links will immediately appear on the home carousel and gallery page.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Paste Media URL (Vercel link)..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-xs border border-border p-3 w-full bg-stone-50 font-mono"
              />
              <select 
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                className="text-xs border border-border p-3 w-full bg-stone-50 font-bold uppercase tracking-widest"
              >
                <option value="image">Image File</option>
                <option value="video">Video File</option>
              </select>
            </div>
            
            <input 
              type="text" 
              placeholder="Brief description (e.g., Turkey eating)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xs border border-border p-3 w-full bg-stone-50"
            />
            
            <button 
              onClick={handleAddLink}
              disabled={!url || uploading}
              className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {uploading ? (
                <span className="animate-spin"><FaSpinner /></span>
              ) : (
                <FaCloudUploadAlt size={16} />
              )}
              {uploading ? 'Registering Link...' : 'Link to Farm Gallery'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="py-20 text-center">
            <span className="animate-spin inline-block text-primary mb-4">
              <FaSpinner size={24} />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Syncing Media Library...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Dynamic Items section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-stone-500">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div> 
                Custom Media ({items.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="group relative bg-white border border-border overflow-hidden">
                    <div className="aspect-square bg-stone-100 relative overflow-hidden">
                      {item.type === 'video' ? (
                        <div className="w-full h-full relative">
                          <video src={item.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <FaPlayCircle size={32} />
                          </div>
                        </div>
                      ) : (
                        <img src={item.url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      )}
                      
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                          {item.type}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => handleDelete(item)}
                          className="bg-red-600 text-white p-3 hover:bg-red-700 transition-colors shadow-xl"
                          title="Delete Permanently"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] font-medium text-stone-500 italic line-clamp-1">
                        {item.description || 'No description'}
                      </p>
                      <div className="mt-2 pt-2 border-t border-stone-100 flex justify-between items-center">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#2ecc71]">Displayed on Site</span>
                        <span className="text-[8px] text-stone-400 font-mono">
                          {item.createdAt?.toDate().toLocaleDateString() || 'Recently Added'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {items.length === 0 && (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-stone-100 bg-stone-50/30">
                    <span className="mx-auto text-stone-200 mb-4 inline-block">
                      <FaImage size={32} />
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      You haven't added any custom media. <br /> Showing system defaults instead.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Static Defaults section */}
            <div className="pt-8 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2 text-stone-400">
                System Defaults ({STATIC_DEFAULTS.length})
              </h3>
              <p className="text-[10px] text-stone-400 mb-6 font-medium italic">
                {items.length > 0 
                  ? "Note: These default images are currently HIDDEN because you have active custom media."
                  : "Note: These images are currently VISIBLE as the fallback gallery."}
              </p>
              
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 opacity-60 grayscale">
                {STATIC_DEFAULTS.map((item) => (
                  <div key={item.id} className="relative group aspect-square bg-stone-100 border border-border overflow-hidden">
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-stone-900/10" />
                    <div className="absolute top-1 left-1">
                      <span className="bg-stone-800 text-white text-[6px] font-bold uppercase px-1 py-0.5 tracking-tighter">Default</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
