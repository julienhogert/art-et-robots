//% color="#AA278D"
//% groups="['Create Timers', 'Use them']"
namespace Timers {
    //%
    export class timer { 
         millis:number;
         constructor() {
            this.millis = control.millis();
         }
        
    //% block="$this(timer) every $interval sec."
    public every_x_secs(interval: number,handler: () => void) {
        if(this.millis + interval*1000 < control.millis()){
            this.restart_timer();
            handler();
        }
    }    
    //% block="$this(timer) every $interval sec."
    //% handlerStatement
    public every_x_secs_inline(interval: number, handler: () => void) {
        if(this.millis + interval*1000 < control.millis()){
            this.restart_timer();
            handler();
        }
    }
    //% block="$this(timer) every $interval millis."
    //% interval_ms.shadow="timePicker"
    //% handlerStatement
    public every_x_millis(interval_ms: number, handler: () => void) {
        if(this.millis + interval_ms < control.millis()){
             this.restart_timer();
             handler();
        }
    }
    //% block="$this(timer) restart timer"
    public restart_timer() {
        this.millis = control.millis();
    }
    
    //% block="$this(timer) every $interval sec."
    //% handlerStatement
    public onEventAsStatement(interval: number, handler: () => void) {
        if(this.millis + interval*1000 < control.millis()){
             this.millis = control.millis();
             handler();
        }
    }

    }
    //% group="Create Timers"
    //% block="Create new timer"
    //% blockSetVariable=Timer1
    //% weight=100
    export function createCounters(): timer {
        return new timer();
    }
}