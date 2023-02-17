let countdown;
const timeDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')


 function timer(seconds){
    clearInterval(countdown) //clear any existing coutndown
    const now = Date.now()
    const then = now + (seconds * 1000)
    displayTime(seconds)
    displayEndTime(then)

   countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now()) / 1000 )
        
        if(secondsLeft < 0){
            clearInterval(countdown)
        }
        // display it
        displayTime(secondsLeft)
        
    },1000)
 }

 function displayTime(seconds){
    const minutes = Math.floor(seconds / 60) 
    const remainderSeconds = seconds % 60

    const display = `${minutes < 0 ? 0: minutes}:${remainderSeconds < 10 ? '0':''}${remainderSeconds < 0 ? "0": remainderSeconds}`
    timeDisplay.textContent = display
    document.title = display
 }


function displayEndTime(timestamp){
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    const adjustedHour = hour > 12 ? hour - 12 : hour
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? 0 :""}${minutes}`
}


function startTimer(){
    const seconds = parseInt((this.dataset.time))
    timer(seconds)

}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', function(e){
    e.preventDefault()
    const minutes = this.minutes.value
    this.reset()
    timer(minutes * 60)    
})