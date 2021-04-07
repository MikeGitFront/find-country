import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
    query {
        countries {
            code
        name
        emoji
        emojiU
        continent {
            name
      }
    }
  }
`