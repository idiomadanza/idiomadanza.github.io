const fs = require('fs');
const path = require('path');

const team = [
  { id: 'patricia', name: 'Patricia', role: 'Gründerin & Bachata', isFounder: true, instagram: 'https://instagram.com/idiomadanza', imagePos: 'object-top', bio: [{icon: '🎓', text: 'Bachata Sensual Instructor Level 1 by Korke & Judith'}, {icon: '🥈', text: 'Social Dance Competition J&J Strasbourg 2022'}, {icon: '🥉', text: 'Social Dance Competition J&J Wien 2023'}, {icon: '🥉', text: 'Social Dance Competition J&J Prag 2022'}] },
  { id: 'stephan', name: 'Stephan', role: 'Gründer & Bachata', isFounder: true, instagram: 'https://instagram.com/idiomadanza', imagePos: 'object-top', bio: [{icon: '🎓', text: 'Bachata Sensual Instructor Level 2 by Korke & Judith'}, {icon: '🎓', text: 'Bachata Dominican Instructor Level 1 by Evelyn La Negra'}, {icon: '🎓', text: 'Dutch Zouk Teachers Course'}, {icon: '🥈', text: 'Social Dance Competition J&J Bachata Sensual Congress Germany Pro Division 2024'}, {icon: '🥈', text: 'Social Dance Competition J&J Belgien 2023'}] },
  { id: 'chris_und_nalini', name: 'Chris & Nalini', role: 'Gründer-Duo', isFounder: true, instagram: 'https://www.instagram.com/chrishart_91/', imagePos: 'object-top', quote: '"Unsere Passion ist der authentische Ausdruck des Bachata Sensual. Wir lehren mit Fokus auf die fundierte Technik und Ästhetik nach den Begründern Korke & Judith."' },
  { id: 'pancho_und_anna', name: 'Pancho & Anna', role: 'Trainer', imagePos: 'object-[center_30%]', bio: [{icon: '🎓', text: 'Certified in Germany'}, {icon: '🕺💃', text: 'Salsa Fusion (all styles)'}, {icon: '🌍', text: 'International artist and choreographer'}, {icon: '📍', text: 'Nürnberg Bayern'}] },
  { id: 'omar', name: 'Omar', role: 'Trainer', imagePos: 'object-top', bio: [{icon: '🥈', text: 'Sensual Madness J&J Madrid 2026'}] },
  { id: 'antonia', name: 'Antonia', role: 'Trainer' },
  { id: 'sebastian', name: 'Sebastian', role: 'Trainer', imagePos: 'object-top' },
  { id: 'silke', name: 'Silke', role: 'Trainer', imagePos: 'object-top' },
  { id: 'janis', name: 'Janis', role: 'Trainer' },
  { id: 'katharina', name: 'Katharina', role: 'Trainer' },
  { id: 'vicky', name: 'Vikky', role: 'Trainer', imagePos: 'object-top', instagram: 'https://instagram.com/bailaniina', bio: [{icon: '🥇', text: 'Bachata Switch - Bachata Town Fest, Puerto Escondido, Mexiko 2026'}, {icon: '🥉', text: 'J&J Bavaria Bachata Cup, München 2026'}] }
];

fs.mkdirSync('src/content/team', { recursive: true });

team.forEach(t => {
  const data = {
    id: t.id,
    name: t.name,
    role: t.role,
    isFounder: t.isFounder || false,
    image: `../../assets/images/team/${t.id}.png`,
    imagePosition: t.imagePos || 'object-center'
  };
  if (t.instagram) data.instagram = t.instagram;
  if (t.quote) data.founderQuote = t.quote;
  if (t.bio) data.bio = t.bio;
  
  fs.writeFileSync(`src/content/team/${t.id}.json`, JSON.stringify(data, null, 2));
});

console.log('Team content generated.');
