import { motion } from 'motion/react';
import { FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import { instagramUrl, INSTAGRAM_POST_URLS } from '../data';
import InstagramEmbed from './InstagramEmbed';

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-accent mb-4">
              <FaInstagram size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Social Diary</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
              Connect with <span className="text-primary italic">Ammal Farm</span>
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Witness the daily life at our farm, from neonatal care to harvest seasons. Follow us for live updates, availability alerts, and a glimpse into sustainable farming in Tamil Nadu.
            </p>
          </div>
          
          <a 
            href={instagramUrl}
            target="_blank"
            rel="no-referrer"
            className="inline-flex items-center gap-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
              @ammal_farm
            </span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
              <FaExternalLinkAlt size={10} />
            </div>
          </a>
        </div>

        {/* Dynamic Embed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSTAGRAM_POST_URLS.map((url, index) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-stone-50 border border-border overflow-hidden p-2 shadow-sm hover:shadow-xl transition-all"
            >
              <InstagramEmbed url={url} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Call to Action */}
        <div className="mt-12 text-center md:hidden">
          <a 
            href={instagramUrl}
            target="_blank"
            rel="no-referrer"
            className="inline-flex items-center gap-2 bg-stone-50 border border-border px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-sm"
          >
            <FaInstagram /> View All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
