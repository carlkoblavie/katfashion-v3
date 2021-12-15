import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
      first_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      location: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(2)
      ]),
      last_name: schema.string({ trim: true }, [
        rules.required(),
        rules.alpha(),
        rules.minLength(2)
      ]),
      gender: schema.enum(['Male', 'Female']),
      phone_number: schema.string({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true })

      ]),
      other_phone_number: schema.string.optional({ trim: true }, [
        rules.mobile({ locales: ['en-GH'] }),
        rules.unique({ table: 'customers', column: 'phone_number', caseInsensitive: true }),
        rules.unique({ table: 'customers', column: 'other_phone_number', caseInsensitive: true })
      ])
  })


  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */

  public messages = {
     required: '{{field}} is required',
     alpha: 'Enter a valid {{field}}, having only alphabets',
     minLength: '{{field}} should be more than {{options.minLength}} characters',
     regex: 'Please enter a valid mobile number',
     mobile: 'Enter a valid GH {{field}}',
     'phone_number.unique': '{{field}} is already registered with a customer'
  }
}
