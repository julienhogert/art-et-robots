function faire_demi_tour () {
	
}
function avancer_en_ligne () {
    basic.showArrow(ArrowNames.North)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function suivre_la_ligne () {
	
}
function reculer () {
    basic.showArrow(ArrowNames.South)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function avancer () {
    basic.showArrow(ArrowNames.North)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function tourner (direction: number) {
    if (direction < 0) {
        basic.showArrow(ArrowNames.East)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse + direction)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse - direction)
    } else {
        basic.showArrow(ArrowNames.West)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse - direction)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse + direction)
    }
}
function stopper () {
    maqueen.motorStop(maqueen.Motors.All)
}
function eviter_les_obstacles () {
    stopper()
    if (maqueen.Ultrasonic(null) < 15) {
        basic.showIcon(IconNames.No)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse_demi_tour)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, vitesse_demi_tour)
    }
}
let vitesse_demi_tour = 0
let vitesse = 0
vitesse = 130
let direction = 30
vitesse_demi_tour = 60
basic.forever(function () {
    avancer()
    eviter_les_obstacles()
})
