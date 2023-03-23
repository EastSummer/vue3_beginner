import mitt from 'mitt'

type Events = {
  [PropName: string]: any
}

const emitter = mitt<Events>()

export default emitter
