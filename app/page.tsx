'use client';

import { useState, useEffect } from 'react';
import { 
  getAnnualFlyingStars, 
  getMonthlyFlyingStars, 
  getStarInfo, 
  SECTORS, 
  STARS,
  ELEMENTS,
  getPersonalFengShui,
  type Element,
  type Star,
} from '@/lib/fengshui';

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function Home() {
  const [activeTab, setActiveTab] = useState<'stars' | 'kua' | 'elements'>('stars');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  
  // Kua calculator state
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  const annualStars = getAnnualFlyingStars(currentYear);
  const monthlyStars = getMonthlyFlyingStars(currentYear, currentMonth);
  const personalFengShui = getPersonalFengShui(birthYear, gender);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-serif mb-2">
          <span className="chinese-char text-gold">風水</span>
          <span className="text-rice/80 ml-3">Feng Shui</span>
        </h1>
        <p className="text-rice/50 text-sm tracking-widest uppercase">
          Flying Stars • Kua Number • Five Elements
        </p>
      </header>

      {/* Tab Navigation */}
      <nav className="flex justify-center gap-2 mb-8">
        {[
          { id: 'stars', label: '飛星 Flying Stars', icon: '✧' },
          { id: 'kua', label: '卦 Kua Number', icon: '☯' },
          { id: 'elements', label: '五行 Elements', icon: '⚊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${
              activeTab === tab.id
                ? 'bg-gold/20 text-gold border border-gold/50 glow-gold'
                : 'bg-zinc-900/50 text-rice/60 border border-zinc-800 hover:border-gold/30'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Flying Stars Section */}
      {activeTab === 'stars' && (
        <section className="space-y-8">
          {/* Year/Month Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-rice/60 text-sm">Year:</label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-rice focus:border-gold outline-none"
              >
                {Array.from({ length: 20 }, (_, i) => 2020 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-rice/60 text-sm">Month:</label>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-rice focus:border-gold outline-none"
              >
                {monthNames.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Flying Star Grids */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Annual Stars */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-center">
                <span className="chinese-char text-gold">年星</span>
                <span className="text-rice/70 ml-2">Annual Stars {currentYear}</span>
              </h2>
              <FlyingStarGrid 
                stars={annualStars} 
                selectedSector={selectedSector}
                onSelectSector={setSelectedSector}
              />
            </div>

            {/* Monthly Stars */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-center">
                <span className="chinese-char text-gold">月星</span>
                <span className="text-rice/70 ml-2">Monthly Stars {monthNames[currentMonth - 1]}</span>
              </h2>
              <FlyingStarGrid 
                stars={monthlyStars}
                selectedSector={selectedSector}
                onSelectSector={setSelectedSector}
              />
            </div>
          </div>

          {/* Selected Sector Details */}
          {selectedSector !== null && (
            <SectorDetails 
              sectorIndex={selectedSector}
              annualStar={annualStars[Math.floor(selectedSector / 3)][selectedSector % 3]}
              monthlyStar={monthlyStars[Math.floor(selectedSector / 3)][selectedSector % 3]}
            />
          )}

          {/* Star Legend */}
          <StarLegend />
        </section>
      )}

      {/* Kua Number Section */}
      {activeTab === 'kua' && (
        <section className="space-y-8">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-serif text-center mb-6">
              <span className="chinese-char text-gold">八卦</span>
              <span className="text-rice/70 ml-2">Calculate Your Kua</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-rice/60 text-sm mb-1">Birth Year</label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  min={1900}
                  max={2030}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-rice focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-rice/60 text-sm mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-rice focus:border-gold outline-none"
                >
                  <option value="male">Male ♂</option>
                  <option value="female">Female ♀</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kua Results */}
          <KuaResults personalFengShui={personalFengShui} />
        </section>
      )}

      {/* Elements Section */}
      {activeTab === 'elements' && (
        <section className="space-y-8">
          <h2 className="text-xl font-serif text-center mb-6">
            <span className="chinese-char text-gold">五行</span>
            <span className="text-rice/70 ml-2">The Five Elements</span>
          </h2>
          <ElementsGuide />
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-rice/30 text-xs">
        <p>Personal Feng Shui Reference • Flying Stars Method (玄空飛星)</p>
      </footer>
    </main>
  );
}

// ==========================================
// FLYING STAR GRID COMPONENT
// ==========================================

function FlyingStarGrid({ 
  stars, 
  selectedSector, 
  onSelectSector 
}: { 
  stars: number[][];
  selectedSector: number | null;
  onSelectSector: (index: number | null) => void;
}) {
  // Map grid position to sector index (matching SECTORS array)
  const positionToSector: Record<string, number> = {
    '0-0': 0, '0-1': 1, '0-2': 2,  // SE, S, SW
    '1-0': 3, '1-1': 4, '1-2': 5,  // E, C, W
    '2-0': 6, '2-1': 7, '2-2': 8,  // NE, N, NW
  };

  return (
    <div className="bagua-grid max-w-xs mx-auto">
      {stars.map((row, rowIndex) =>
        row.map((starNum, colIndex) => {
          const sectorIndex = positionToSector[`${rowIndex}-${colIndex}`];
          const sector = SECTORS[sectorIndex];
          const star = getStarInfo(starNum);
          const isSelected = selectedSector === sectorIndex;

          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onSelectSector(isSelected ? null : sectorIndex)}
              className={`bagua-cell cursor-pointer ${
                isSelected ? 'border-gold ring-2 ring-gold/30' : ''
              } ${
                star.nature === 'auspicious' ? 'hover:bg-jade/10' :
                star.nature === 'inauspicious' ? 'hover:bg-cinnabar/10' : 'hover:bg-zinc-800'
              }`}
            >
              {/* Direction */}
              <span className="text-[10px] text-rice/40 absolute top-1 left-1">
                {sector.direction}
              </span>
              <span className="text-[10px] chinese-char text-rice/40 absolute top-1 right-1">
                {sector.chinese}
              </span>
              
              {/* Star Number */}
              <span 
                className={`text-2xl font-bold ${
                  star.nature === 'auspicious' ? 'text-jade' :
                  star.nature === 'inauspicious' ? 'text-cinnabar' : 'text-rice/70'
                }`}
                style={{ textShadow: `0 0 10px ${star.color}40` }}
              >
                {starNum}
              </span>
              
              {/* Star Name */}
              <span className="text-[10px] text-rice/50 mt-1">
                {star.chineseName}
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}

// ==========================================
// SECTOR DETAILS COMPONENT
// ==========================================

function SectorDetails({ 
  sectorIndex, 
  annualStar, 
  monthlyStar 
}: { 
  sectorIndex: number;
  annualStar: number;
  monthlyStar: number;
}) {
  const sector = SECTORS[sectorIndex];
  const annual = getStarInfo(annualStar);
  const monthly = getStarInfo(monthlyStar);
  
  // Determine combination effect
  const getCombinationEffect = () => {
    // Sum of stars
    const sum = annualStar + monthlyStar;
    
    // Special combinations
    if ((annualStar === 2 && monthlyStar === 5) || (annualStar === 5 && monthlyStar === 2)) {
      return { type: 'danger', message: '⚠️ EXTREMELY DANGEROUS: 2-5 combination brings severe illness and misfortune. Apply all Earth remedies immediately.' };
    }
    if ((annualStar === 2 && monthlyStar === 3) || (annualStar === 3 && monthlyStar === 2)) {
      return { type: 'warning', message: '⚠️ Conflict with authority, legal issues, bullying.' };
    }
    if ((annualStar === 8 && monthlyStar === 8)) {
      return { type: 'excellent', message: '🌟 DOUBLE PROSPERITY: Exceptional wealth luck. Activate strongly!' };
    }
    if ((annualStar === 1 && monthlyStar === 6) || (annualStar === 6 && monthlyStar === 1)) {
      return { type: 'excellent', message: '🌟 HEAVENLY WATER: Career success and mentor luck combined.' };
    }
    if ((annualStar === 4 && monthlyStar === 1) || (annualStar === 1 && monthlyStar === 4)) {
      return { type: 'good', message: '📚 Academic success and romance luck. Good for writers and students.' };
    }
    
    // General assessment
    if (annual.nature === 'auspicious' && monthly.nature === 'auspicious') {
      return { type: 'excellent', message: '✨ Both stars auspicious - favorable sector this month.' };
    }
    if (annual.nature === 'inauspicious' && monthly.nature === 'inauspicious') {
      return { type: 'danger', message: '⚠️ Both stars inauspicious - avoid this sector or apply remedies.' };
    }
    return { type: 'mixed', message: '⚖️ Mixed energies - use sector with awareness.' };
  };

  const combination = getCombinationEffect();

  return (
    <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-serif text-center mb-4">
        <span className="chinese-char text-gold text-2xl">{sector.chinese}</span>
        <span className="text-rice/80 ml-2">{sector.name} ({sector.direction})</span>
      </h3>

      {/* Combination Alert */}
      <div className={`rounded-lg p-4 mb-6 ${
        combination.type === 'danger' ? 'bg-cinnabar/20 border border-cinnabar/40' :
        combination.type === 'warning' ? 'bg-yellow-900/20 border border-yellow-700/40' :
        combination.type === 'excellent' ? 'bg-jade/20 border border-jade/40' :
        'bg-zinc-800 border border-zinc-700'
      }`}>
        <p className="text-sm">{combination.message}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Annual Star */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span 
              className={`text-3xl font-bold ${
                annual.nature === 'auspicious' ? 'text-jade' :
                annual.nature === 'inauspicious' ? 'text-cinnabar' : 'text-rice/70'
              }`}
            >
              {annualStar}
            </span>
            <div>
              <div className="text-sm text-rice/60">Annual Star</div>
              <div className="chinese-char text-gold">{annual.chineseName}</div>
            </div>
          </div>
          <p className="text-sm text-rice/70">{annual.meaning}</p>
        </div>

        {/* Monthly Star */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span 
              className={`text-3xl font-bold ${
                monthly.nature === 'auspicious' ? 'text-jade' :
                monthly.nature === 'inauspicious' ? 'text-cinnabar' : 'text-rice/70'
              }`}
            >
              {monthlyStar}
            </span>
            <div>
              <div className="text-sm text-rice/60">Monthly Star</div>
              <div className="chinese-char text-gold">{monthly.chineseName}</div>
            </div>
          </div>
          <p className="text-sm text-rice/70">{monthly.meaning}</p>
        </div>
      </div>

      {/* Remedies & Activators */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {(annual.remedies.length > 0 || monthly.remedies.length > 0) && (
          <div className="bg-cinnabar/10 rounded-lg p-4">
            <h4 className="text-sm font-medium text-cinnabar mb-2">🛡️ Remedies (Don&apos;ts)</h4>
            <ul className="text-xs text-rice/70 space-y-1">
              {[...new Set([...annual.remedies, ...monthly.remedies])].map((remedy, i) => (
                <li key={i}>• {remedy}</li>
              ))}
            </ul>
          </div>
        )}
        {(annual.activators.length > 0 || monthly.activators.length > 0) && (
          <div className="bg-jade/10 rounded-lg p-4">
            <h4 className="text-sm font-medium text-jade mb-2">⚡ Activators (Do&apos;s)</h4>
            <ul className="text-xs text-rice/70 space-y-1">
              {[...new Set([...annual.activators, ...monthly.activators])].map((act, i) => (
                <li key={i}>• {act}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// STAR LEGEND COMPONENT
// ==========================================

function StarLegend() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-serif text-center mb-4">
        <span className="chinese-char text-gold">九星</span>
        <span className="text-rice/70 ml-2">The Nine Stars</span>
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {STARS.map((star) => (
          <div 
            key={star.number}
            className={`text-center p-2 rounded-lg ${
              star.nature === 'auspicious' ? 'bg-jade/10' :
              star.nature === 'inauspicious' ? 'bg-cinnabar/10' : 'bg-zinc-800/50'
            }`}
          >
            <div 
              className={`text-2xl font-bold ${
                star.nature === 'auspicious' ? 'text-jade' :
                star.nature === 'inauspicious' ? 'text-cinnabar' : 'text-rice/70'
              }`}
            >
              {star.number}
            </div>
            <div className="text-[10px] chinese-char text-gold">{star.chineseName}</div>
            <div className="text-[9px] text-rice/50 mt-1">{star.name}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs text-rice/50">
        <span><span className="inline-block w-3 h-3 bg-jade/30 rounded mr-1"></span> Auspicious</span>
        <span><span className="inline-block w-3 h-3 bg-cinnabar/30 rounded mr-1"></span> Inauspicious</span>
        <span><span className="inline-block w-3 h-3 bg-zinc-700 rounded mr-1"></span> Neutral</span>
      </div>
    </div>
  );
}

// ==========================================
// KUA RESULTS COMPONENT
// ==========================================

function KuaResults({ personalFengShui }: { personalFengShui: ReturnType<typeof getPersonalFengShui> }) {
  const { kua, zodiac } = personalFengShui;
  const element = ELEMENTS[kua.element];
  const zodiacElement = ELEMENTS[zodiac.element];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Main Kua Card */}
      <div className="bg-zinc-900/80 border border-gold/30 rounded-xl p-6 text-center glow-gold">
        <div className="text-6xl font-bold text-gold mb-2">{kua.number}</div>
        <div className="chinese-char text-3xl text-rice/80 mb-2">{kua.chineseTrigram}</div>
        <div className="text-rice/60">{kua.trigram} Trigram</div>
        <div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm ${
          kua.group === 'East' ? 'bg-jade/20 text-jade' : 'bg-metal-light/20 text-metal-light'
        }`}>
          {kua.group} Group
        </div>
      </div>

      {/* Zodiac */}
      <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-6 text-center">
        <div className="chinese-char text-4xl text-gold mb-2">{zodiac.chineseAnimal}</div>
        <div className="text-xl text-rice/80">{zodiac.animal}</div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className={`inline-block w-4 h-4 rounded element-${zodiac.element}`}></span>
          <span className="text-rice/60">{zodiac.chineseElement} {zodiac.element.charAt(0).toUpperCase() + zodiac.element.slice(1)}</span>
        </div>
      </div>

      {/* Directions */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Favorable */}
        <div className="bg-jade/10 border border-jade/30 rounded-xl p-4">
          <h4 className="text-jade font-medium mb-3 text-center">✓ Favorable Directions</h4>
          <div className="space-y-2">
            {kua.favorableDirections.map((dir, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-lg font-bold text-jade w-8">{dir.direction}</span>
                <span className="text-rice/70">{dir.purpose}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unfavorable */}
        <div className="bg-cinnabar/10 border border-cinnabar/30 rounded-xl p-4">
          <h4 className="text-cinnabar font-medium mb-3 text-center">✗ Unfavorable Directions</h4>
          <div className="space-y-2">
            {kua.unfavorableDirections.map((dir, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-lg font-bold text-cinnabar w-8">{dir.direction}</span>
                <span className="text-rice/70">{dir.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Element Info */}
      <div className={`rounded-xl p-4 element-${kua.element}`}>
        <h4 className="font-medium mb-2 text-white">Your Element: {element.chinese} {kua.element.toUpperCase()}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
          <div>
            <span className="text-white/50">Colors:</span> {element.colors.join(', ')}
          </div>
          <div>
            <span className="text-white/50">Materials:</span> {element.materials.slice(0, 2).join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ELEMENTS GUIDE COMPONENT
// ==========================================

function ElementsGuide() {
  const elements: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  
  return (
    <div className="space-y-6">
      {/* Productive Cycle */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {elements.map((el, i) => (
            <span key={el} className="flex items-center gap-2">
              <span className={`inline-block px-3 py-1 rounded element-${el} text-white text-sm`}>
                {ELEMENTS[el].chinese} {el}
              </span>
              {i < elements.length - 1 && <span className="text-gold">→</span>}
            </span>
          ))}
          <span className="text-gold">→</span>
          <span className={`inline-block px-3 py-1 rounded element-wood text-white text-sm`}>
            {ELEMENTS.wood.chinese} wood
          </span>
        </div>
        <p className="text-rice/50 text-sm mt-2">Productive Cycle (生)</p>
      </div>

      {/* Element Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        {elements.map((el) => {
          const data = ELEMENTS[el];
          return (
            <div key={el} className={`rounded-xl p-4 element-${el}`}>
              <div className="text-center mb-3">
                <div className="chinese-char text-3xl text-white">{data.chinese}</div>
                <div className="text-white/80 capitalize">{el}</div>
              </div>
              
              <div className="space-y-3 text-xs text-white/80">
                <div>
                  <div className="text-white/50 mb-1">Colors</div>
                  <div>{data.colors.join(', ')}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Shapes</div>
                  <div>{data.shapes.join(', ')}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Materials</div>
                  <div>{data.materials.slice(0, 3).join(', ')}</div>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <div className="text-white/50">Produces → <span className="text-white capitalize">{data.produces}</span></div>
                  <div className="text-white/50">Destroys → <span className="text-white capitalize">{data.destroys}</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Do's and Don'ts */}
      <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-6">
        <h3 className="text-lg font-serif text-center mb-4 text-gold">Element Interactions</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-jade mb-2">✓ Productive Relationships</h4>
            <ul className="text-rice/70 space-y-1">
              <li>• Water feeds Wood (plants need water)</li>
              <li>• Wood feeds Fire (fuel for flames)</li>
              <li>• Fire creates Earth (ash becomes soil)</li>
              <li>• Earth produces Metal (minerals)</li>
              <li>• Metal carries Water (condensation)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-cinnabar mb-2">✗ Destructive Relationships</h4>
            <ul className="text-rice/70 space-y-1">
              <li>• Water extinguishes Fire</li>
              <li>• Fire melts Metal</li>
              <li>• Metal chops Wood</li>
              <li>• Wood depletes Earth (roots)</li>
              <li>• Earth absorbs Water (dam)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
