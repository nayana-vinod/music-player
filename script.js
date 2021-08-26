const musicContainer = document.querySelector('.music-container')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//song titles and cover
const songs = ['Girl on Fire', 'Speechless', 'You cant stop the girl']
const images = ['one_day', 'past', 'sun_will_rise']

//keep track of the songs
let songIndex = 2

//initially load song info DOM
loadSong(songs[songIndex], images[songIndex])

//update song details
function loadSong(song, pic){
    title.innerText = song
    audio.src = `Music/${song}.mp3`
    cover.src = `Images/${pic}.jpg`
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length -1){
        songIndex = 0
    } 

    loadSong(songs[songIndex], images[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) *100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth // total width
    const clickX = e.offsetX // the point it is clicked at
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration
}

//Event listeners
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

//change song events
nextBtn.addEventListener('click', nextSong)

prevBtn.addEventListener('click', ()=>{
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length -1
    } 

    loadSong(songs[songIndex], images[songIndex])
    playSong()
})

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)