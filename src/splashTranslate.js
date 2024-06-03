function splashTranslate(root) {
    var val = 1; // opacity value
    var per = 0; // loading bar position
    setInterval(() => {
        if(per < 100) {
            per += 0.5;
            root.style.setProperty('--loading', `${per}%`);
        
        } else {
            if(val > 0) {
                val -= 0.05;
                root.style.setProperty('--splashOpacity', val);
            }
        }
    }, 1 )
}
export default {}
export { splashTranslate }