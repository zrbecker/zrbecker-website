
const convertOptionsDefault = {
  ignoreExtraKeys: true
}

export default function convert(obj, spec, options) {
  options = Object.assign(convertOptionsDefault, options)
  const newObj = Object.assign({}, options.ignoreExtraKeys ? {} : obj)
  let errors = null
  for (const key of Object.keys(spec)) {
    const keySpec = spec[key]
    if (key in obj) {
      if (keySpec.validate && !keyspec.validate(obj[key])) {
        const msg = keySpec.validationErrorMessage || `${key} is invalid.`
        errors = errors || {}
        errors[key] = errors[key] || {messages: []}
        errors[key].messages.push(msg)
      }
      newObj[key] = keySpec.convert ? keySpec.convert(obj[key]) : obj[key]
    } else if (keySpec.required) {
      const msg = keySpec.requiredErrorMessage || `${key} is required.`
      errors = errors || {}
      errors[key] = errors[key] || {messages: []}
      errors[key].messages.push(msg)
    }
  }
  return [newObj, errors]
}
