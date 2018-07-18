export
interface Command {
  id: string
  command(...args: any[]): any
}
