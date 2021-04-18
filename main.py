def faire_demi_tour():
    if Math.random_boolean():
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, vitesse_demi_tour)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, vitesse_demi_tour)
    else:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, vitesse_demi_tour)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, vitesse_demi_tour)
    basic.show_icon(IconNames.SAD)
def avancer_en_ligne():
    basic.show_arrow(ArrowNames.NORTH)
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, vitesse)
def couleur_chassis():
    global strip
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.show_color(neopixel.colors(NeoPixelColors.WHITE))
def suivre_la_ligne():
    pass
def reculer():
    basic.show_arrow(ArrowNames.SOUTH)
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, vitesse)
def avancer():
    basic.show_arrow(ArrowNames.NORTH)
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, vitesse)
def tourner(direction: number):
    if direction < 0:
        basic.show_arrow(ArrowNames.EAST)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, vitesse + direction)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, vitesse - direction)
    else:
        basic.show_arrow(ArrowNames.WEST)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, vitesse - direction)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, vitesse + direction)
def stopper():
    maqueen.motor_stop(maqueen.Motors.ALL)
    basic.show_icon(IconNames.NO)
def eviter_les_obstacles():
    global distance_sonar
    distance_sonar = maqueen.ultrasonic(PingUnit.CENTIMETERS)
    if distance_sonar > 2 and distance_sonar < distance_detection:
        faire_demi_tour()
        while maqueen.ultrasonic(PingUnit.CENTIMETERS) > 2 and maqueen.ultrasonic(PingUnit.CENTIMETERS) < distance_detection:
            pass
distance_sonar = 0
strip: neopixel.Strip = None
distance_detection = 0
vitesse_demi_tour = 0
vitesse = 0
couleur_chassis()
vitesse = 60
direction = 30
vitesse_demi_tour = 60
distance_detection = 20

def on_forever():
    avancer_en_ligne()
    eviter_les_obstacles()
basic.forever(on_forever)
