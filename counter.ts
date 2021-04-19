//% color="#D063CF" icon="\uf017"
//% groups="['Create Timers', 'Use them']"
namespace Timers {
    //%
    export class timer { 
         millis:number;
         constructor() {
            this.millis = control.millis();
         }
  
    //% block="$this(timer) every $interval sec."
    //% handlerStatement
    public every_x_secs(interval: number, handler: () => void) {
        if(this.millis + interval*1000 < control.millis()){
            this.restart_timer();
            handler();
        }
    }
    //% block="$this(timer) every $interval_ms millis."
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

    }
    //% group="Create Timers"
    //% block="Create new timer"
    //% blockSetVariable=Counter
    //% weight=100
    export function createCounters(): timer {
        return new timer();
    }
} 