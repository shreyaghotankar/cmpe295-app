export const SECTIONS = {
     CLOSET: 'Your Closet',
     OUTFITS: 'Your Outfits'
}

export const WELCOME_STEPS = {
     CLOSET: 'Closet', 
     COLORS: 'Colors',
     NEW_ITEM: 'Add New Item'
}

export const ITEM_TYPE = {
     BOTTOM: 'BOTTOM',
     UPPER: 'TOP'
}

export const FILTER_TYPES = {
     UPPER: 'TOP', 
     BOTTOM: 'BOTTOM',
     ALL: 'ALL'
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
     'p_long-sleeve': 'LongSleeve', //change to p_long-sleeve
     p_collar: 'Collar',
     p_pocket: 'Pocket',
     'p_v-neck': 'V Neck', // change to p_v-neck
     p_button: 'Button', 
     p_hooded: 'Hooded',
     p_zipper: 'Zipper'
}

export const BOTTOM_ATTRIBUTES ={
     t_floral: 'Floral',
     t_stripe: 'Stripe',
     t_dot: 'Dot',

     
     f_denim: 'Denim',

     f_cotton: 'Cotton',
     f_leather: 'Leather',
     f_knit: 'Knit',
     f_pleated: 'Pleated',
     p_zipper: 'Zipper',
     s_fit: 'Fit',
     s_pencil: 'Pencil',
     s_midi: 'Midi',
     s_mini: 'Mini',
     s_maxi: 'Maxi'
}

export const getAttrName = (upper, attr) => {
     if (upper) {
          return UPPER_ATTRIBUTES[attr];
     }
     return BOTTOM_ATTRIBUTES[attr];
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

export const PERSONAS = [
     {
          name: 'Shreya Ghotankar',
          title: 'Lead and Backend',
          linkedin: 'https://www.linkedin.com/in/shreya-ghotankar/',
          about: "Amazing human-being! She is unstoppable and ready to explore new horizons.",
          profUrl: 'https://media-exp1.licdn.com/dms/image/C5603AQF75BZZmMXugQ/profile-displayphoto-shrink_200_200/0/1631052407804?e=1643241600&v=beta&t=N4MqpTXi3VtcRCPybHQCuEYu8Qs9qfPSg-7MiQ4EOo4',
          githubUrl: 'https://github.com/shreyaghotankar'
     },
     {
          name: 'Manjiri Kadam',
          title: 'ML Deployment',
          linkedin: 'https://www.linkedin.com/in/manjiri-kadam-133085113/',
          about: "Smile is her motto. You can hardly find any other girl who can do so much under time pressure.",
          profUrl: 'https://media-exp1.licdn.com/dms/image/D5635AQHGpfpzUcGs7A/profile-framedphoto-shrink_800_800/0/1632525846968?e=1637575200&v=beta&t=t5QZtLSVIIv6VvBONoO41Dl5z4FBdAqi0GWWKzTel24',
          githubUrl: 'https://github.com/Manjiri1101'
     },
     {
          name: 'Parvathi Pai',
          title: 'Machine Learning',
          linkedin: 'https://www.linkedin.com/in/parvathipai/',
          about: "She knows EVERYTHING! Our main resercher and machine learning enthusiast.",
          profUrl: 'https://avatars.githubusercontent.com/u/45047756?v=4',
          githubUrl: 'https://github.com/ParvathiRPai'
     },
     {
          name: 'Anastasia Zimina',
          title: 'Frontend and Idea',
          linkedin: 'https://www.linkedin.com/in/anastaszi/',
          about: "She loves to create beauty around and laughs in the face of challenging problems.",
          profUrl: 'https://media-exp1.licdn.com/dms/image/C5603AQG8PqiiUKdiRg/profile-displayphoto-shrink_800_800/0/1517199611001?e=1643241600&v=beta&t=as0E-Act-cqcF7mw5j-al7uDLbTqGoCv2Ac9oGtL6Uo',
          githubUrl: 'https://github.com/anastaszi'
     },
]
