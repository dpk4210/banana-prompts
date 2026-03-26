import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Copy, Check, Sparkles, Zap, Image as ImageIcon, Menu, X, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

// --- Types ---
interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

// --- Data ---
const CATEGORIES = ['All', 'Portrait', '3D', 'Surreal', 'Product', 'Landscape', 'Anime'];

const PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'Elegant Corporate Portrait',
    prompt: 'A professional corporate headshot of a young woman with a confident smile, wearing a tailored navy blazer, soft studio lighting, blurred office background, high resolution, 8k, photorealistic.',
    category: 'Portrait',
    tags: ['Professional', 'Headshot', 'Realistic'],
    imageUrl: 'https://picsum.photos/seed/portrait1/400/400'
  },
  {
    id: '2',
    title: 'Mini 3D Cartoon Scene',
    prompt: 'A cute 3D isometric render of a cozy tiny house with a garden, vibrant colors, soft lighting, clay texture, blender style, high detail.',
    category: '3D',
    tags: ['Isometric', 'Cute', 'Render'],
    imageUrl: 'https://picsum.photos/seed/3d1/400/400'
  },
  {
    id: '3',
    title: 'Cinematic Surreal Portrait',
    prompt: 'A surreal portrait of a man with clouds for hair, dreamlike atmosphere, soft pastel colors, cinematic lighting, detailed, artistic.',
    category: 'Surreal',
    tags: ['Artistic', 'Dreamy', 'Abstract'],
    imageUrl: 'https://picsum.photos/seed/surreal1/400/400'
  },
  {
    id: '4',
    title: 'Minimalist Product Shot',
    prompt: 'A sleek modern perfume bottle on a marble pedestal, soft shadows, minimalist background, high-end product photography, 4k.',
    category: 'Product',
    tags: ['Minimalist', 'Luxury', 'Clean'],
    imageUrl: 'https://picsum.photos/seed/product1/400/400'
  },
  {
    id: '5',
    title: 'Cyberpunk Cityscape',
    prompt: 'A futuristic cyberpunk city at night, neon lights, rain-slicked streets, flying cars, high contrast, detailed, atmospheric.',
    category: 'Landscape',
    tags: ['Sci-Fi', 'Neon', 'Future'],
    imageUrl: 'https://picsum.photos/seed/cyberpunk1/400/400'
  },
  {
    id: '6',
    title: 'Anime Style Character',
    prompt: 'An anime style illustration of a warrior girl with a sword, dynamic pose, vibrant colors, cel shading, detailed background.',
    category: 'Anime',
    tags: ['Illustration', 'Action', 'Vibrant'],
    imageUrl: 'https://picsum.photos/seed/anime1/400/400'
  },
];

// --- Components ---

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-banana)] rounded-lg flex items-center justify-center text-xl">🍌</div>
            <span className="font-display font-bold text-xl tracking-tight">Banana Prompts</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Prompts</Link>
            <Link to="/generator" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Generator</Link>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Pro</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              <Zap size={16} className="text-[var(--color-banana)]" />
              <span>Get Pro</span>
            </button>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-lg"
        >
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-900">Prompts</Link>
            <Link to="/generator" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-900">Generator</Link>
            <a href="#" className="text-base font-medium text-gray-900">Resources</a>
            <a href="#" className="text-base font-medium text-gray-900">Pro</a>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-medium">
              <Zap size={16} className="text-[var(--color-banana)]" />
              <span>Get Pro</span>
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-banana-light)]/30 pt-20 pb-32">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-banana-light)] via-transparent to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-banana-light)] text-yellow-800 text-xs font-semibold uppercase tracking-wide mb-6 border border-yellow-200">
            <Sparkles size={12} />
            Updated Daily
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[var(--color-ink)] mb-6 tracking-tight leading-[0.9]">
            2000+ Nano Banana Prompts<br className="hidden md:block" /> That Actually Work
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get thousands of free, high-quality Nano Banana prompts. Copy, paste, and generate stunning AI images with our massive library.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-banana)] text-black font-bold rounded-xl hover:bg-[var(--color-banana-dark)] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20">
              Explore Library
              <ArrowRight size={20} />
            </button>
            <Link to="/generator" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <ImageIcon size={20} />
              Try Generator
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={prompt.imageUrl} 
          alt={prompt.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <button 
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-700" />}
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
            {prompt.category}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
            <Check size={10} />
            Verified
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-tight">{prompt.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow font-mono bg-gray-50 p-3 rounded-lg border border-gray-100">
          {prompt.prompt}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {prompt.tags.map(tag => (
            <span key={tag} className="text-xs text-gray-400">#{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Generator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [{ text: prompt }]
        }
      });
      
      // Note: The actual response structure for image generation might vary.
      // Assuming standard text response for now, but in a real app we'd handle image bytes.
      // Since gemini-2.5-flash-image returns base64, we need to extract it.
      
      // For this demo, we'll simulate generation if the API call structure is complex to mock without real key access in preview
      // However, per instructions, we must use real API.
      // Let's try to extract the image if present.
      
      // Inspecting response structure for image...
      // Usually it's in candidates[0].content.parts[0].inlineData
      
      // Since I can't guarantee the exact response shape without running it, I'll add a fallback for the UI.
      // But I will attempt to use the real API.
      
      // Wait, the instructions say:
      // "Generate images using gemini-2.5-flash-image by default"
      // "The output response may contain both image and text parts; you must iterate through all parts to find the image part."
      
      // Let's implement that logic.
      
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            break;
          }
        }
      }
      
      if (!generatedImage && !response.candidates?.[0]?.content?.parts?.some(p => p.inlineData)) {
         // Fallback if no image found (maybe text response explaining why)
         setError("No image generated. The model might have returned text only.");
      }

    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="generator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[var(--color-banana-dark)] font-bold tracking-wider uppercase text-sm">Playground</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-4">Test Your Prompts</h2>
          <p className="text-gray-600">Experience the power of Nano Banana instantly.</p>
        </div>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 p-2 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-banana)] transition-all">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your image here... (e.g., A futuristic banana city)"
                  className="w-full h-32 resize-none outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                />
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-mono">gemini-2.5-flash-image</span>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="px-6 py-2 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="text-[var(--color-banana)]" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {['Cyberpunk cat', 'Minimalist logo', 'Oil painting of a forest'].map(p => (
                  <button 
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="text-xs text-left p-3 bg-white border border-gray-200 rounded-xl hover:border-[var(--color-banana)] hover:bg-[var(--color-banana-light)]/20 transition-colors truncate"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-96 aspect-square bg-white rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden relative shadow-inner">
              {generatedImage ? (
                <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="text-gray-400" size={32} />
                  </div>
                  <p className="text-sm text-gray-500">Your generated image will appear here</p>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center p-6 text-center">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Elite Banana Prompts Library",
      description: "Access 2,000+ hand-picked Banana Prompts that guarantee high-fidelity results. Unlike generic lists, every entry is refined for professional-grade output.",
      icon: <Sparkles className="text-[var(--color-banana-dark)]" size={24} />
    },
    {
      title: "Nano Banana Pro Optimization",
      description: "Each prompt is a Nano Banana Pro Prompt at heart. We calibrate every keyword to ensure compatibility with the latest Nano Banana algorithms.",
      icon: <Zap className="text-[var(--color-banana-dark)]" size={24} />
    },
    {
      title: "Fresh Banana Prompts Daily",
      description: "While others update weekly, we add new Banana Prompts every single day. Stay ahead of the curve with the trendiest styles.",
      icon: <Check className="text-[var(--color-banana-dark)]" size={24} />
    },
    {
      title: "Instant Copy-Paste Workflow",
      description: "Efficiency is key. Our Banana Prompts platform allows you to copy your favorite Nano Banana Prompts with one click.",
      icon: <Copy className="text-[var(--color-banana-dark)]" size={24} />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Why Top Creators Choose Banana Prompts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the difference of a curated, optimized prompt library designed for the next generation of AI creators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-[var(--color-banana-light)]/50 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-[var(--color-ink)] selection:bg-[var(--color-banana)] selection:text-black flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator" element={<GeneratorPage />} />
          </Routes>
        </div>
        <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--color-banana)] rounded-lg flex items-center justify-center text-xl">🍌</div>
                <span className="font-display font-bold text-xl">Banana Prompts</span>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Banana Prompts. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-black transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">Discord</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = PROMPTS.filter(prompt => {
    const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category 
                    ? 'bg-black text-white shadow-lg shadow-black/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-banana)] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No prompts found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="mt-4 text-[var(--color-banana-dark)] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <Features />
    </>
  );
}

function GeneratorPage() {
  return (
    <div className="pt-8 pb-16">
      <Generator />
    </div>
  );
}

