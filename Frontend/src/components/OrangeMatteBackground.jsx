export default function OrangeMatteBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 select-none">
      {/* Deep Matte Black Base */}
      <div className="absolute inset-0 bg-[#090a0e]">
        {/* Subtle Matte Black Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,#12141c_0%,#090a0e_80%)]" />
      </div>

      {/* Gentle Texture Grid (Subtle, Non-distracting) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(rgba(217, 112, 62, 0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Soft Muted Amber & Warm Terracotta Ambient Glows (Gentle, Not Blinding) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-Right Soft Warm Aura */}
        <div 
          className="absolute -top-[25%] -right-[15%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-[#d9703e]/[0.08] via-[#c86230]/[0.04] to-transparent filter blur-[160px] animate-[pulse_14s_ease-in-out_infinite]"
        />

        {/* Bottom-Left Soft Muted Copper Aura */}
        <div 
          className="absolute -bottom-[20%] -left-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#b85426]/[0.07] via-[#c86230]/[0.03] to-transparent filter blur-[160px] animate-[pulse_16s_ease-in-out_infinite_reverse]"
        />

        {/* Subtle Horizontal Warm Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d9703e]/20 to-transparent opacity-50" />
      </div>
    </div>
  );
}
