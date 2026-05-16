import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Gallery from '../components/Gallery';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  description: string;
  createdAt?: Timestamp;
}

const STATIC_GALLERY: MediaItem[] = [
  { id: 's1', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/farm-herd.jpg', type: 'image', description: 'Our healthy farm herd' },
  { id: 's2', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/nellore-judipi.jpg', type: 'image', description: 'Nellore Judipi Buck' },
  { id: 's3', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/salem-black.jpg', type: 'image', description: 'Salem Black livestock' },
  { id: 's4', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/country-chicken.jpg', type: 'image', description: 'Free-range country chicken' },
  { id: 's5', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/ducks.jpg', type: 'image', description: 'Farm ducks in habitat' },
  { id: 's6', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/black-chicken.jpg', type: 'image', description: 'Kadaknath poultry' },
  { id: 's7', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/turkey.jpg', type: 'image', description: 'Seasonal Turkeys' },
  { id: 's8', url: 'https://dlugisbcds8fnzdn.public.blob.vercel-storage.com/images/logo.jpeg', type: 'image', description: 'Ammal Farm Pride' },
];

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>(STATIC_GALLERY);

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MediaItem[];
      if (data.length > 0) {
        setItems(data);
      } else {
        setItems(STATIC_GALLERY);
      }
    }, (error) => {
      console.warn("Firestore error, using defaults:", error);
      setItems(STATIC_GALLERY);
    });
    return () => unsubscribe();
  }, []);

  const galleryItems = items;

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-border py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block mb-4">
              Visual Archives
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
              Farm <span className="text-primary italic">Gallery</span>
            </h1>
            <p className="mt-6 text-text-muted max-w-xl text-sm leading-relaxed font-medium">
              Explore the daily life, premium livestock, and sustainable practices at Ammal Farm. From our majestic Nellore Judipi to our free-range poultry.
            </p>
          </motion.div>
        </div>
      </header>

      <Gallery 
        items={galleryItems}
      />
      
      <section className="py-24 px-4 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif italic text-primary mb-6">"Quality you can see, health you can trust."</h2>
            <p className="text-stone-500 text-sm tracking-wide uppercase font-bold">Ammal Farm Premium Archives</p>
        </div>
      </section>
    </div>
  );
}
