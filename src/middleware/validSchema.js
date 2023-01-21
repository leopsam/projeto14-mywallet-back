export function validSchema(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false })
      console.log("Passou") //tirar depois
  
      if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
      }
      next()
    }
  }