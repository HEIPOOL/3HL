import * as fs from 'fs'
import * as path from 'path'

const tracksData = {
  user: "Heitor",
  partner: "Livia",
  months: 3,
  topTracks: [
    { rank: 1, title: "Preferida", artist: "KayBlack, Wall Hein", plays: 56, preview: "/assets/placeholder-audio/Preferida.mp3" },
    { rank: 2, title: "Papoulas", artist: "Yago Oproprio", plays: 42, preview: "/assets/placeholder-audio/Papoulas.mp3" },
    { rank: 3, title: "Mais Ninguém", artist: "Banda do Mar", plays: 31, preview: "/assets/placeholder-audio/Mais-Ninguem.mp3" },
    { rank: 4, title: "Louis V, Menina Linda", artist: "Sidoka", plays: 20, preview: "/assets/placeholder-audio/Louis-V-Menina-Linda.mp3" },
    { rank: 5, title: "Mimo Caro - MC GP", artist: "MC GP, Yunk Vino, Mc Dena", plays: 12, preview: "/assets/placeholder-audio/Mimo-Caro-MC-GP.mp3" },
  ]
}

const momentsData = {
  relationship: "3 meses",
  moments: [
    { id: "m1", date: "2025-10-15", title: "Primeira Mensagem", desc: "Ele falou 'oi' e ela riu. Foi o começo.", media: "/images/photos/heitor-livia-01.jpg" },
    { id: "m2", date: "2025-11-02", title: "Primeiro Encontro", desc: "Café + altos papos. Ela pediu mais açúcar.", media: "/images/photos/heitor-livia-02.jpg" },
    { id: "m3", date: "2025-12-20", title: "Viagem de Fim de Semana", desc: "Um vídeo curto com a roda gigante. Risadas eternas.", media: "/images/videos/clip-01.mp4" },
  ]
}

const dataDir = path.join(__dirname, '../public/data')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

fs.writeFileSync(
  path.join(dataDir, 'tracks.json'),
  JSON.stringify(tracksData, null, 2)
)

fs.writeFileSync(
  path.join(dataDir, 'moments.json'),
  JSON.stringify(momentsData, null, 2)
)

console.log('Mock data generated successfully!')
