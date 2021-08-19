import React from 'react'
import { Header } from 'semantic-ui-react'

export default function Layout({Children}) {
    return (
        <div>
            <Header as="h2" block textAlign="center">ALS MEDICINE</Header>
            {Children}
        </div>
    )
}
