import { BaseCommand, args } from '@adonisjs/core/build/standalone'

export default class Scaffold extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'scaffold'
  public static aliases = ['s']

  @args.string()
  public model: string

  @args.string()
  public properties: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'generate a scaffold for a resource'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async doScaffold() {
    this.generator
      .addFile(name)
      .appRoot(this.application.appRoot)
      .destinationDir('app/Controllers/Http')
      .useMustache()
      .stub(join(__dirname, './templates/controller.txt'))
      .apply({ name })
  }

  public async run() {
    const tasks = [() => this.doScaffold(), () => this.doScaffold(), () => this.doScaffold()]

    for (const fn of tasks) {
      await fn()
    }
  }
}
