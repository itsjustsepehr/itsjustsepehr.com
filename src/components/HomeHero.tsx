import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

type Props = { writingHref: string; aboutHref: string };
export default function HomeHero({ writingHref, aboutHref }: Props) {
  return (
    <section aria-labelledby="hero-title" className="home-hero relative isolate overflow-hidden bg-black text-white">
      <WebGLShader />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="border border-white/20 p-2">
          <div className="border border-white/20 px-4 py-12 text-center sm:px-10 sm:py-16">
            <p className="mx-auto mb-7 text-xs font-medium uppercase tracking-[0.18em] text-white/75">Sepehr / Software engineer / Banking systems</p>
            <h1 id="hero-title" className="mx-auto max-w-[18ch] text-[clamp(2.25rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tighter">Building reliable systems.<br /><span className="text-white/75">Sharing what I learn.</span></h1>
            <p className="mx-auto mt-7 max-w-[56ch] text-sm leading-relaxed text-white/80 sm:text-base">I’m Sepehr, a software engineer with 8 years of experience. I work on banking systems in Iran and write about software, architecture, and the lessons along the way.</p>
            <div className="my-8 flex items-center justify-center gap-2 text-xs text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />Writing in English & Persian</div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LiquidButton asChild size="xl" className="rounded-full border border-white/40 text-white"><a href={writingHref}>Explore my writing <span aria-hidden="true">→</span></a></LiquidButton>
              <a href={aboutHref} className="inline-flex min-h-12 items-center rounded-full px-6 text-sm text-white/85">More about me <span className="ms-2" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
