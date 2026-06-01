import React, { useState, useEffect } from 'react';
import { db, storage, handleFirestoreError, OperationType } from '../lib/firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { FaCloudUploadAlt, FaTrash, FaPlayCircle, FaImage, FaSpinner, FaImages, FaInfoCircle, FaStar, FaRegStar, FaEdit, FaCheck, FaTimes, FaCamera, FaPlus, FaCheckCircle, FaFileVideo, FaFileImage } from 'react-icons/fa';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  description: string;
  isHighlight?: boolean;
  highlightedAt?: Timestamp;
  highlightOrder?: number | null;
  createdAt?: Timestamp;
}

export default function AdminGallery() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  // New Local File Upload and Android integration states
  const [activeUploadMode, setActiveUploadMode] = useState<'upload' | 'link'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);

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
        isHighlight: false,
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (droppedFile.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }
  };

  const handleUploadFile = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const isVideo = file.type.startsWith('video/');
    const typeValue = isVideo ? 'video' : 'image';
    
    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(progress));
        }
      });
      
      xhr.addEventListener('load', async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            const downloadUrl = response.url;
            
            await addDoc(collection(db, 'media'), {
              url: downloadUrl,
              type: typeValue,
              description: description || `Uploaded ${file.name}`,
              isHighlight: false,
              createdAt: serverTimestamp(),
            });
            
            setUploading(false);
            setUploadProgress(null);
            setFile(null);
            setDescription('');
            alert('File uploaded to Vercel Blob and registered successfully!');
          } catch (dbError: any) {
            console.error("Firestore write error after upload:", dbError);
            handleFirestoreError(dbError, OperationType.WRITE, 'media');
            setUploading(false);
            setUploadProgress(null);
          }
        } else {
          try {
            const errRes = JSON.parse(xhr.responseText);
            setUploadError(errRes.error || "Failed to upload file to Vercel Blob.");
          } catch {
            setUploadError("Failed to upload file to Vercel Blob.");
          }
          setUploading(false);
          setUploadProgress(null);
        }
      });
      
      xhr.addEventListener('error', () => {
        setUploadError("Network error occurred during Vercel Blob upload.");
        setUploading(false);
        setUploadProgress(null);
      });
      
      xhr.open('POST', `/api/upload?filename=${encodeURIComponent(file.name)}`);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
      xhr.send(file);
    } catch (e: any) {
      console.error(e);
      setUploadError(e.message || "An unexpected error occurred during setup.");
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleToggleHighlight = async (item: MediaItem) => {
    const isNowHighlight = !item.isHighlight;
    try {
      await updateDoc(doc(db, 'media', item.id), {
        isHighlight: isNowHighlight,
        highlightedAt: isNowHighlight ? serverTimestamp() : null,
        highlightOrder: null
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'media');
    }
  };

  const handleStartEdit = (item: MediaItem) => {
    setEditingId(item.id);
    setEditValue(item.description || '');
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateDoc(doc(db, 'media', id), {
        description: editValue
      });
      setEditingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'media');
    }
  };

  const handleDelete = (item: MediaItem) => {
    setItemToDelete(item);
  };

  const confirmDelete = async (item: MediaItem) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'media', item.id));
      
      // Delete from Storage if it's a firebase URL
      if (item.url.includes('firebasestorage')) {
        const storageRef = ref(storage, item.url);
        await deleteObject(storageRef);
      } 
      // Delete from Vercel Blob if it's a Vercel Blob URL
      else if (item.url.includes('vercel-storage.com')) {
        try {
          const response = await fetch(`/api/delete?url=${encodeURIComponent(item.url)}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            console.error("Failed to delete from Vercel Blob proxy:", await response.text());
          }
        } catch (err) {
          console.error("Error calling Vercel Blob delete proxy:", err);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'media');
    }
  };

  return (
    <div className="bg-white border border-border">
      <div className="p-8 border-b border-border bg-stone-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <FaImages size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Gallery Management</h2>
              <p className="text-xs text-stone-400 font-medium uppercase tracking-widest mt-1">Add or remove media from public displays</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border p-6 rounded-lg max-w-2xl">
          {/* Active Mode Tabs */}
          <div className="flex border-b border-border mb-6">
            <button 
              onClick={() => {
                setActiveUploadMode('upload');
                setUploadError(null);
              }}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${activeUploadMode === 'upload' ? 'border-primary text-primary' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              📷 Direct Camera / Upload
            </button>
            <button 
              onClick={() => {
                setActiveUploadMode('link');
                setUploadError(null);
              }}
              className={`flex-1 pb-3 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${activeUploadMode === 'link' ? 'border-primary text-primary' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              🔗 Post External Link
            </button>
          </div>

          <div className="space-y-4">
            {activeUploadMode === 'upload' ? (
              /* Direct File Upload & Camera Selector */
              <div className="space-y-4 animate-fade-in">
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded p-8 text-center transition-all cursor-pointer ${
                    dragActive ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-stone-200 hover:border-primary/50'
                  }`}
                  onClick={() => document.getElementById('camera-file-input')?.click()}
                >
                  <input 
                    id="camera-file-input"
                    type="file" 
                    accept="image/*,video/*"
                    className="hidden" 
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  
                  {file ? (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-3">
                        {file.type.startsWith('video/') ? (
                          <span className="text-[#3498db] shrink-0"><FaFileVideo size={36} /></span>
                        ) : (
                          <span className="text-[#2ecc71] shrink-0"><FaFileImage size={36} /></span>
                        )}
                        <div className="text-left min-w-0">
                          <p className="text-xs font-bold font-mono text-stone-800 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Unknown Type'}</p>
                        </div>
                      </div>
                      
                      {file.type.startsWith('image/') && (
                        <div className="relative w-32 h-32 mx-auto border border-border overflow-hidden bg-stone-50">
                          <img src={URL.createObjectURL(file)} alt="Upload preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <button 
                        onClick={() => setFile(null)}
                        disabled={uploading}
                        className="text-[10px] uppercase font-bold tracking-wider text-red-500 hover:text-red-700 transition-colors mx-auto block bg-red-50 px-3 py-1 border border-red-100 disabled:opacity-50"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-14 h-14 bg-stone-100 text-stone-500 mx-auto rounded-full flex items-center justify-center transition-transform hover:scale-105">
                        <FaCamera size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800">
                          <span className="text-primary hover:underline">Tap here</span> to Take Photo / Video using Mobile Camera
                        </p>
                        <p className="text-[9px] text-stone-400 uppercase tracking-widest mt-1">
                          Or select any image/video from your device files
                        </p>
                      </div>
                      <div className="inline-flex gap-2 text-[8px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 px-3 py-1">
                        <span>Camera</span>
                        <span>•</span>
                        <span>Library</span>
                        <span>•</span>
                        <span>Videos</span>
                      </div>
                    </div>
                  )}
                </div>

                <input 
                  type="text" 
                  placeholder="Tell customers about this file... (e.g. Pure-Bred Nellore Judipi)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={uploading}
                  className="text-xs border border-border p-3 w-full bg-stone-50 focus:border-primary outline-none transition-colors"
                />

                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                    ⚠️ {uploadError}
                  </div>
                )}

                {uploadProgress !== null && (
                  <div className="space-y-1.5 mt-2 p-3 bg-stone-50 border border-border">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#2ecc71]">
                      <span className="flex items-center gap-1.5 shrink-0">
                        <span className="animate-spin inline-block"><FaSpinner /></span>
                        Uploading to Firebase Storage...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 overflow-hidden rounded-full">
                      <div className="h-full bg-[#2ecc71] transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleUploadFile}
                  disabled={!file || uploading}
                  className="w-full bg-[#2ecc71] text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#27ae60] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <span className="animate-spin"><FaSpinner /></span>
                  ) : (
                    <FaCloudUploadAlt size={16} />
                  )}
                  {uploading ? `Uploading (${uploadProgress || 0}%)` : 'Upload File to Farm Gallery'}
                </button>
              </div>
            ) : (
              /* External Link Form */
              <div className="space-y-4">
                <div className="flex items-start gap-4 mb-4 text-stone-600">
                  <span className="mt-1 flex-shrink-0 text-accent"><FaInfoCircle /></span>
                  <p className="text-xs leading-relaxed font-medium">
                    Paste URLs from your <strong className="text-primary italic">Vercel Blob Storage</strong> (e.g., https://.../images/...) to add them to the farm gallery. Links will immediately appear on the home carousel and gallery page.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Paste Media URL (Vercel link)..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-xs border border-border p-3 w-full bg-stone-50 font-mono focus:border-primary outline-none transition-colors"
                  />
                  <select 
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                    className="text-xs border border-border p-3 w-full bg-stone-50 font-bold uppercase tracking-widest focus:border-primary outline-none transition-colors"
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
                  className="text-xs border border-border p-3 w-full bg-stone-50 focus:border-primary outline-none transition-colors"
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
            )}
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
                        <img src={item.url} alt="" className="w-full h-full object-cover transition-all duration-500" />
                      )}
                      
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                          {item.type}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleToggleHighlight(item)}
                          className={`${item.isHighlight ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'} text-white p-3 transition-colors shadow-xl rounded-full`}
                          title={item.isHighlight ? "Remove from Highlights" : "Add to Highlights"}
                        >
                          {item.isHighlight ? <FaStar size={18} /> : <FaRegStar size={18} />}
                        </button>
                        <button 
                          onClick={() => handleDelete(item)}
                          className="bg-red-600 text-white p-3 hover:bg-red-700 transition-colors shadow-xl rounded-full"
                          title="Delete Permanently"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="mb-1">
                        {editingId === item.id ? (
                          <div className="flex gap-1 items-center">
                            <input 
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="text-[9px] border border-stone-200 px-2 py-1 w-full bg-stone-50 font-medium focus:outline-none focus:border-accent"
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(item.id)}
                            />
                            <button onClick={() => handleSaveEdit(item.id)} className="text-[#2ecc71] hover:scale-110 p-1.5 transition-transform" title="Save">
                              <FaCheck size={12} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="text-red-400 hover:scale-110 p-1.5 transition-transform" title="Cancel">
                              <FaTimes size={12} />
                            </button>
                          </div>
                        ) : (
                          <div 
                            className="flex justify-between items-center group/desc cursor-pointer hover:bg-stone-50 p-1 -m-1 rounded transition-colors"
                            onClick={() => handleStartEdit(item)}
                          >
                            <p className="text-[9px] font-medium text-stone-500 italic line-clamp-1 flex-grow">
                              {item.description || 'No description (Click to add)'}
                            </p>
                            <div className="flex items-center gap-2">
                              <button 
                                className="opacity-40 group-hover/desc:opacity-100 text-stone-400 hover:text-primary transition-all p-1"
                                title="Edit Description"
                              >
                                <FaEdit size={12} />
                              </button>
                              {item.isHighlight && (
                                <div className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 border border-stone-200 px-1.5 py-0.5 rounded" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-accent flex-shrink-0" title="Highlighted">
                                    <FaStar size={10} />
                                  </span>
                                  <select
                                    value={item.highlightOrder || ""}
                                    onChange={async (e) => {
                                      const val = e.target.value ? parseInt(e.target.value, 10) : null;
                                      try {
                                        if (val !== null) {
                                          const batch = writeBatch(db);
                                          // Reassign slot: find another item using this slot and clear it
                                          items.forEach((otherItem) => {
                                            if (otherItem.id !== item.id && otherItem.highlightOrder === val) {
                                              batch.update(doc(db, 'media', otherItem.id), {
                                                highlightOrder: null
                                              });
                                            }
                                          });
                                          // Update current item to are-assigned slot
                                          batch.update(doc(db, 'media', item.id), {
                                            highlightOrder: val
                                          });
                                          await batch.commit();
                                        } else {
                                          await updateDoc(doc(db, 'media', item.id), {
                                            highlightOrder: null
                                          });
                                        }
                                      } catch (error) {
                                        handleFirestoreError(error, OperationType.UPDATE, 'media');
                                      }
                                    }}
                                    className="bg-transparent text-[8px] font-bold text-stone-600 outline-none cursor-pointer uppercase tracking-tight"
                                    title="Set Slide Number"
                                  >
                                    <option value="">Auto</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
                                      const occupied = items.some(otherItem => otherItem.id !== item.id && otherItem.highlightOrder === n);
                                      return (
                                        <option key={n} value={n}>
                                          Slot #{n}{occupied ? " (Occupied)" : ""}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
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
              
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 opacity-60">
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

      {/* Custom Confirmation Modal for Deletion */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-stone-800 text-stone-900 max-w-sm w-full p-6 shadow-2xl animate-scale-up font-sans text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaTrash size={18} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-stone-800 mb-2">Delete Media?</h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Are you sure you want to permanently delete this media item? This action is irreversible.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-widest transition-colors border border-stone-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const item = itemToDelete;
                  setItemToDelete(null);
                  confirmDelete(item);
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest shadow-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
