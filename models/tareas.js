const Tarea = require("./tarea");

class Tareas {

  _listado = {};

  get listadoArr(){
    const listado = [];
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }
  
  constructor(){
    this._listado = {};
  }

  borrarTarea( id = '' ){
    if( this._listado[id] ) delete this._listado[id];
  }

  cargarTareasFromArray( tareas = [] ){
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  crearTarea( desc = '' ){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(){
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i+1}`.yellow;
      console.log( `${idx} ${tarea.desc} :: ${tarea.completadoEn? 'Completada'.green: 'Pendiente'.red}`);
    });
  }

  listarPendientesCompletadas( completadas ){
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea, i) => {
      if(completadas && tarea.completadoEn) {
        contador++;
        console.log( `${contador.toString().yellow} ${tarea.desc} :: ${tarea.completadoEn.green}`);
      } 
      if(!completadas && !tarea.completadoEn) {
        contador++;
        console.log( `${contador.toString().yellow} ${tarea.desc} :: ${'Pendiente'.red}`);
      } 
    });
  }

  toggleCompletadas( ids = [] ){
    ids.forEach( id => {
      const tarea = this._listado[id];
        if( !tarea.completadoEn ){
          tarea.completadoEn = new Date().toISOString();
        }
    });

    this.listadoArr.forEach( tarea => {
      if( !ids.includes(tarea.id) )
        this._listado[tarea.id].completadoEn = null;
    });
  }
}

module.exports = Tareas;