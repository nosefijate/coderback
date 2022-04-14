const fs = require("fs");
class Contenedor {
  constructor(archiveName) {
    (this.archiveName = archiveName),
    this.data = []
  }

  async save(product) {    
    try {
      if(!fs.existsSync(this.archiveName)){
        product.id = 1 
        this.data.push(product)
        fs.promises.writeFile(
          this.archiveName,
          JSON.stringify(this.data, null, 2) 
        )
      }else{
        this.data = await this.getAll() 
        product.id = this.getMaxId() + 1; 
        this.data.push(product) 
        
        fs.promises.writeFile(
          this.archiveName,
          JSON.stringify(this.data, null, 2)
        )
      }
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }

  getMaxId() {
    var maxValue = Number.MIN_VALUE;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id > maxValue) {
        maxValue = this.data[i].id;
      }
    }
    return maxValue
  }

  async getById(id) {
    try {
      const objs = await this.getAll();
      const findObj = objs.find((obj) => obj.id === Number(id))
      if(findObj){
        return findObj
      }else{
        return {error: "producto no encontrado"}
      }
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archiveName, "utf-8")
      return JSON.parse(data)
      
    } catch (error) {
      return `Error de lectura: ${error}`
    }
  }
  async deleteById(id) {
    const objs = await this.getAll()
    const findObj = objs.find((obj) => obj.id === id)
    if (findObj === -1) {
      console.log(`Error ID inexistente ${id}`)
    }
    objs.splice(findObj, 1)
    try {
      await fs.promises.writeFile(
        this.archiveName,
        JSON.stringify(objs, null, 2)
      )
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }

  async updateById(id, newElement){
    try {
      await this.deleteById(id);
      const newProduct = {
        ...newElement,
        id: Number(id),
      }

      const list = await this.getAll()
      list.push(newProduct)
      fs.promises.writeFile(this.archiveName, JSON.stringify(list, null, 2))

        
    } catch (error) {
        return (error)            
    }
}
  async deleteAll() {
    await fs.promises.unlink(this.archiveName)
  }
}


module.exports = Contenedor