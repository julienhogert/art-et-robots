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
function toggle_on_off () {
    if (playstop) {
        playstop = 0
    } else {
        playstop = 1
    }
}
function couleur_chassis () {
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.shift(2)
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
}
function suivre_ligne_2 () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
        maqueen.motorStop(maqueen.Motors.M1)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
            maqueen.motorStop(maqueen.Motors.M1)
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motorStop(maqueen.Motors.M2)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motorStop(maqueen.Motors.M2)
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        } else {
            maqueen.motorStop(maqueen.Motors.M2)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    dessiner()
})
function reculer () {
    basic.showArrow(ArrowNames.South)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function compteur_dessiner () {
    if (millis_servo + servo_interval < control.millis()) {
        millis_servo = control.millis()
        dessiner()
        servo_interval = 1000 * randint(0, 5)
    }
}
function suivre_une_ligne () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
        derniere_direction = -1
        basic.showArrow(ArrowNames.East)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        derniere_direction = 1
        basic.showArrow(ArrowNames.West)
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    toggle_on_off()
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
        if (playstop == 1) {
            avancer()
        } else {
            stopper()
        }
    }
}
function dessiner () {
    if (servo_dessin == true) {
        maqueen.servoRun(maqueen.Servos.S2, servo_angle_repos)
        basic.showIcon(IconNames.Sword)
        servo_dessin = false
    } else {
        maqueen.servoRun(maqueen.Servos.S2, servo_angle_dessin)
        basic.showIcon(IconNames.House)
        servo_dessin = true
    }
}
let distance_sonar = 0
let derniere_direction = 0
let servo_interval = 0
let millis_servo = 0
let strip: neopixel.Strip = null
let playstop = 0
let servo_dessin = false
let servo_angle_repos = 0
let servo_angle_dessin = 0
let distance_detection = 0
let vitesse_demi_tour = 0
let vitesse = 0
let compteur = 0

couleur_chassis()
vitesse = 255
let direction = 30
vitesse_demi_tour = 60
distance_detection = 20
servo_angle_dessin = 80
servo_angle_repos = 120
servo_dessin = false
basic.forever(function () {
    compteur_dessiner()
})

namespace fun {
  /** 
  * Calcule la fameuse séquence de numéros de Fibonacci!
    */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value - 1) + fib(value - 2);
    }
}