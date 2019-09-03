const IS_DEV = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development'

export default class GraphQLBasicLogger {
  private isDev

  constructor(params: { isDev: boolean }) {
    this.isDev = params.isDev
  }

  public requestDidStart(o: any): void {
    const query = o.queryString

    // only log queries in dev and don't log introspection queries
    // from code editors or REST clients (e.g. Insomnia)
    if (this.isDev && query.indexOf('IntrospectionQuery') < 0) {
      console.log(query)

      if (o.variables) {
        console.log('variables: ', o.variables)
      }
    }
  }
}
