import {Router, Request, Response, NextFunction} from 'express';
import modeloportadas from '../modelos/lessons';
import modeloejercicios from '../modelos/ejercicios';
class RouterMeter {
    router: Router;
    publicKey: Buffer;
    constructor(){
      this.router = Router();
      this.routes();
    }
    rutaprincipal(req: Request, res: Response, next: NextFunction): void {
      modeloportadas.insertarUno(req.body.archivo, req.body.idcurso)
      .subscribe((id => {
        res.json(id);
        next();
      }))
    }
    insEjercicio(req: Request, res: Response, next: NextFunction): void {
      console.log('llegamos a la ruta ejercicio');
      modeloejercicios.insertarUno(req.body.idsnapshot, req.body.archivo)
      .subscribe(id => {
        console.log('ejercicio insertado en la base de datos: ', id);
        res.json(id);
        // next();
      })

    }
    private routes() {
      // cuando funciona la mutation no hará falta esta ruta
      this.router.post('/ejercicio', this.insEjercicio);
      this.router.post('/', this.rutaprincipal);
    }
}
const rutameter = new RouterMeter().router;
export default rutameter;
