function faire_demi_tour () {
    if (Math.randomBoolean()) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse_demi_tour)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, vitesse_demi_tour)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, vitesse_demi_tour)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse_demi_tour)
    }
    basic.showIcon(IconNames.Sad)
}
function avancer_en_ligne () {
    basic.showArrow(ArrowNames.North)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function couleur_chassis () {
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.shift(2)
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
}
function reculer () {
    basic.showArrow(ArrowNames.South)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
maqueen.ltEvent(maqueen.Patrol1.PatrolLeft, maqueen.Voltage.High, function () {
	
})
function suivre_une_ligne () {
    serial.writeNumber(maqueen.readPatrol(maqueen.Patrol.PatrolRight))
    serial.writeLine("" + (maqueen.readPatrol(maqueen.Patrol.PatrolLeft)))
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (mode_avancer == 0) {
        mode_avancer = 1
        avancer()
    } else {
        mode_avancer = 0
        stopper()
    }
})
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
    basic.showIcon(IconNames.No)
}
function eviter_les_obstacles () {
    distance_sonar = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distance_sonar > 2 && distance_sonar < distance_detection) {
        soundExpression.giggle.play()
        faire_demi_tour()
        while (maqueen.Ultrasonic(PingUnit.Centimeters) > 2 && maqueen.Ultrasonic(PingUnit.Centimeters) < distance_detection) {
        	
        }
        stopper()
    }
}
let distance_sonar = 0
let mode_avancer = 0
let strip: neopixel.Strip = null
let distance_detection = 0
let vitesse_demi_tour = 0
let vitesse = 0
couleur_chassis()
vitesse = 200
let direction = 30
vitesse_demi_tour = 60
distance_detection = 20
basic.forever(function () {
    suivre_une_ligne()
    eviter_les_obstacles()
})
