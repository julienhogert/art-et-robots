radio.onReceivedNumber(function (receivedNumber) {
    serial.writeLine("" + (receivedNumber))
})
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
function suivre_une_ligne2 () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
    } else {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
            maqueen.motorStop(maqueen.Motors.M1)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
                maqueen.motorStop(maqueen.Motors.M1)
            }
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                maqueen.motorStop(maqueen.Motors.M2)
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                    maqueen.motorStop(maqueen.Motors.M2)
                }
            }
        }
    }
}
function couleur_chassis () {
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.shift(2)
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
}
input.onButtonPressed(Button.A, function () {
    if (dessin_onoff) {
        dessin_onoff = 0
    } else {
        dessin_onoff = 1
    }
})
function reculer () {
    basic.showArrow(ArrowNames.South)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function dessiner_aleatoirement () {
    valeur_aleatoire = randint(0.2, 2.6)
    counter.onEventAsStatement(valeur_aleatoire, function () {
        serial.writeLine("" + (valeur_aleatoire))
        dessiner()
    })
}
input.onButtonPressed(Button.B, function () {
    if (playstop) {
        stopper()
        playstop = 0
        basic.pause(500)
    } else {
        avancer(30)
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        playstop = 1
    }
})
function suivre_une_ligne () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        avancer(50)
    } else {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            tourner(-50)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                tourner(-50)
            }
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                tourner(50)
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    tourner(50)
                }
            }
        }
    }
}
function avancer (vitesse: number) {
    basic.showArrow(ArrowNames.North)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function tourner (directionf: number) {
    if (directionf < 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.abs(directionf))
        maqueen.motorStop(maqueen.Motors.M1)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.abs(directionf))
        maqueen.motorStop(maqueen.Motors.M2)
    }
}
function stopper () {
    basic.showIcon(IconNames.No)
    maqueen.motorStop(maqueen.Motors.All)
}
function suivre_une_ligne3 () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        avancer(50)
    } else {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            tourner(-50)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                tourner(-50)
            }
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                tourner(50)
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    tourner(50)
                }
            }
        }
    }
}
function eviter_les_obstacles () {
    distance_sonar = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (distance_sonar > 2 && distance_sonar < distance_detection) {
        soundExpression.giggle.play()
        faire_demi_tour()
        while (maqueen.Ultrasonic(PingUnit.Centimeters) > 2 && maqueen.Ultrasonic(PingUnit.Centimeters) < distance_detection) {
        	
        }
        if (playstop == 1) {
            avancer(30)
        } else {
            stopper()
        }
    }
}
function dessiner () {
    if (dessin_onoff) {
        if (servo_dessin == true) {
            maqueen.servoRun(maqueen.Servos.S2, servo_angle_repos)
            servo_dessin = false
        } else {
            maqueen.servoRun(maqueen.Servos.S2, servo_angle_dessin)
            servo_dessin = true
        }
    }
}
let distance_sonar = 0
let valeur_aleatoire = 0
let dessin_onoff = 0
let strip: neopixel.Strip = null
let servo_dessin = false
let servo_angle_repos = 0
let servo_angle_dessin = 0
let distance_detection = 0
let vitesse_demi_tour = 0
let vitesse = 0
let playstop = 0
let counter: Counters.counter = null
radio.setGroup(1)
counter = Counters.createCounters()
couleur_chassis()
playstop = 1
vitesse = 30
vitesse_demi_tour = 60
distance_detection = 20
servo_angle_dessin = 90
servo_angle_repos = 120
servo_dessin = false
maqueen.servoRun(maqueen.Servos.S2, servo_angle_repos)
avancer(20)
basic.forever(function () {
    if (playstop) {
        suivre_une_ligne2()
        dessiner_aleatoirement()
        eviter_les_obstacles()
    }
})
