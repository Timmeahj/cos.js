const speed = 2;

const animation = {
    points: [],
    tic: 10*speed,
    speedX: 0.01*speed,
    offsetMax: 300,
    offsetMin: 50,
    minRadius: 2,
    maxRadius: 20,
    spawnRate: 3,
    time: 0
}

document.body.style.background = '#001f3f';
document.body.style.overflow = 'hidden';

function updateLocation(point){
    point.div.style.marginTop = `${point.y*point.offset}px`;
    point.div.style.marginLeft = `${point.x*100*speed}px`;
}

function newPoint(){
    let pointDiv = document.createElement('div');
    let offset = Math.random()*animation.offsetMax+animation.offsetMin;
    let point = {
        x: 0,
        y: 0,
        div: pointDiv,
        r: randomRadius(),
        color: randomColour(offset),
        offset: offset
    }
    animation.points.push(point);
    spawnPoint(point);
}

function spawnPoint(point){
    point.div.style.top = window.innerHeight/2+'px';
    point.div.style.left = Math.random()*-200-10+'px';
    point.div.style.borderRadius = '50%';
    point.div.style.position = 'absolute';
    point.div.style.width = `${point.r}px`;
    point.div.style.height = `${point.r}px`;
    point.div.style.background = `${point.color}`;
    document.body.appendChild(point.div);
}

function randomColour(offset){
    return `rgba(57, 204, 204, ${Math.random()})`;
}

function randomRadius(){
    return (Math.random()*animation.maxRadius)+animation.minRadius;
}

function removePoint(point){
    point.div.remove();
    animation.points = animation.points.filter(e => e !== point);
}

function animate(){
    animation.points.forEach(point => {
        point.y = Math.cos(point.x);
        point.x += animation.speedX;
        updateLocation(point);
        if(point.x*80 > window.innerWidth){
            removePoint(point);
        }
    });
    animation.time++;
    if(animation.time % animation.spawnRate === 0){
        newPoint();
    }
    setTimeout(animate, animation.tic);
}

animate();