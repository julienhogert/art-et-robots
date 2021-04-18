//% color="#AA278D"
namespace Counters {
    //%
    export class counter { 
         millis:number;
         constructor() {
            this.millis = control.millis();
         }
        
    //% block="$this(counter) count until $interval and restart"
    //% handlerStatement
    public onEventAsStatement(interval: number, handler: () => void) {
        if(this.millis + interval*1000 < control.millis()){
             this.millis = control.millis();
             handler();
        }
    }

    }

    //% block="create counters"
    //% blockSetVariable=counter
    export function createCounters(): counter {
        return new counter();
    }
}
