let _newText = '❤',
    _g = 10,
    loop = 1,
    _durVal = 0.1,
    _r = 3.1,
    _grid = 10,
    _type = 'round'
// * UI界面切换togglSildebar
const toggleSlidebar = document.querySelector('.toggleSlidebar')
const slidebarCt = document.querySelector('.slidebarCt')
toggleSlidebar.addEventListener('click', function(event) {
    
    // * 切换slideBar的有无
    const slidebarCtClasses = slidebarCt.classList
    slidebarCtClasses.toggle('toggleDisplay')
    
    // * toggleSlidebar按钮的位置移动
    const toggleSlidebarClasses = toggleSlidebar.classList
    toggleSlidebarClasses.toggle('toggleLeft')
})

// * 切换形状toggleShape
const shapeCt = document.querySelector('.shapeCt')
shapeCt.addEventListener('click', function (event) {
    const target = event.target
    const round = document.querySelector('.round')
    const roundClasses = round.classList
    const rect = document.querySelector('.rect')
    const rectClasses = rect.classList
    if (target === round) {
        _type = 'round'
        roundClasses.add('toggleColor')
        rectClasses.remove('toggleColor')
        newPoints = []
        st()
    } else {
        _type = 'rect'
        roundClasses.remove('toggleColor')
        rectClasses.add('toggleColor')
        newPoints = []
        st()
    }
})
function st () {
    const s = setTimeout(() => {
        loop --
        clear()
        start(_newText, _g, _durVal, _r, _grid, _type)
        setTimeout(s)
        if (!loop) {clearTimeout(s)}
    }, 60)
}
// * inputValue change
function change () {
    _newText = message.value
    newPoints = []
    st()
}
function changeG() {
    _g = gravity.value / 10 + 5
    loop = Math.floor(duration.value / 20)
    _durVal = speed.value / 200
    _r = radius.value / 35 + 3
    _grid = Math.floor(resolution.value / 20 + 7)
    newPoints = []
    st()
}



