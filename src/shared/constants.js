export const SECTIONS = {
  CLOSET: 'Your Closet',
  OUTFITS: 'Your Outfits'
}

export const WELCOME_STEPS = {
  CLOSET: 'Closet', 
  COLORS: 'Colors',
  NEW_ITEM: 'Add New Item'
}

export const UPPER_ATTRIBUTES ={
  t_floral: 'Floral',
  t_stripe: 'Stripe',
  t_dot: 'Dot',
  f_lace: 'Lace',
  f_denim: 'Denim',
  f_chiffon: 'Chiffon',
  f_cotton: 'Cotton',
  f_leather: 'Leather',
  f_fur: 'Fur',
  p_sleeveless: 'Sleeveless',
  p_longsleeve: 'LongSleeve',
  p_collar: 'Collar',
  p_pocket: 'Pocket',
  p_vneck: 'V Neck',
  p_button: 'Button',
  p_hooded: 'Hooded',
  p_zipper: 'Zipper'
}

export const getAttrName = (upper, attr) => {
  if (upper) {
    return UPPER_ATTRIBUTES[attr];
  }
  return attr;
}

export class AddingError extends Error {
  constructor (step = 'S3put', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)
  
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AddingError)
    }
  
    this.name = 'AddingError'
    // Custom debugging information
    this.step = step
    this.date = new Date()
  }
}
