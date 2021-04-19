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
def toggle_on_off():
    global playstop
    if playstop:
        playstop = 0
    else:
        playstop = 1
def couleur_chassis():
    global strip
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    strip.shift(2)
    strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
def suivre_ligne_2():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 50)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50)
        maqueen.motor_stop(maqueen.Motors.M1)
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50)
            maqueen.motor_stop(maqueen.Motors.M1)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        maqueen.motor_stop(maqueen.Motors.M2)
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motor_stop(maqueen.Motors.M2)
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
        else:
            maqueen.motor_stop(maqueen.Motors.M2)

def on_button_pressed_a():
    dessiner()
input.on_button_pressed(Button.A, on_button_pressed_a)

def reculer():
    basic.show_arrow(ArrowNames.SOUTH)
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, vitesse)
def compteur_inc():
    global compteur
    compteur = Math.floor(control.millis() / 1000)
    serial.write_line("" + str((compteur)))
def compteur_dessiner():
    global millis_servo, servo_interval
    if millis_servo + servo_interval < control.millis():
        millis_servo = control.millis()
        servo_interval = 1000 * randint(0, 5)
        dessiner()
def suivre_une_ligne():
    global derniere_direction
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0:
        derniere_direction = -1
        basic.show_arrow(ArrowNames.EAST)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        derniere_direction = 1
        basic.show_arrow(ArrowNames.WEST)

def on_logo_pressed():
    toggle_on_off()
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

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
        soundExpression.giggle.play()
        faire_demi_tour()
        while maqueen.ultrasonic(PingUnit.CENTIMETERS) > 2 and maqueen.ultrasonic(PingUnit.CENTIMETERS) < distance_detection:
            pass
        if playstop == 1:
            avancer()
        else:
            stopper()
def dessiner():
    global servo_dessin
    if servo_dessin == True:
        maqueen.servo_run(maqueen.Servos.S2, servo_angle_repos)
        basic.show_icon(IconNames.SWORD)
        servo_dessin = False
    else:
        maqueen.servo_run(maqueen.Servos.S2, servo_angle_dessin)
        basic.show_icon(IconNames.HOUSE)
        servo_dessin = True
distance_sonar = 0
derniere_direction = 0
servo_interval = 0
millis_servo = 0
strip: neopixel.Strip = None
playstop = 0
compteur = 0
servo_dessin = False
servo_angle_repos = 0
servo_angle_dessin = 0
distance_detection = 0
vitesse_demi_tour = 0
vitesse = 0
couleur_chassis()
vitesse = 255
direction = 30
vitesse_demi_tour = 60
distance_detection = 20
servo_angle_dessin = 80
servo_angle_repos = 120
servo_dessin = False
compteur = 0

def on_forever():
    compteur_inc()
basic.forever(on_forever)
