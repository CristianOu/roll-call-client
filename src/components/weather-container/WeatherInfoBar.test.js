import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import WeatherInfoBar from "./WeatherInfoBar";

const server = setupServer(
    rest.get(
        `https://dmigw.govcloud.dk/v2/metObs/collections/observation/items`,
        (req, res, ctx) => {

            const response = {
                features: [
                    {
                        properties: {
                            observed: '2022-01-01',
                            value: 20.2
                        }
                    }
                ]
            }

            return res(
                ctx.json(response)
            )
        }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays weather info ', async () => {
    render(<WeatherInfoBar/>)
    await screen.findByTestId('temperature');
    expect(await screen.findByTestId('temperature')).toBeInTheDocument()
    expect(await screen.findByTestId('observedAt')).toBeInTheDocument()
})
