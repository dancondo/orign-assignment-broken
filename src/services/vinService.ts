import { get } from "../utils/https"

// const invalidChars = new RegExp(/[I]/, "g")
export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace("IOQ", "")
        .substring(0, 17)

export const validate = (vin: string): string => vin.length !== 17 && "17 chars expected"

export const convert = (res: VinCheckResponse): CarInfo => {
    const Results = res && res.Results
    return Results && Results.length > 0
        ? {
              make: findValue(res.Results, "Make"),
              model: findValue(res.Results, "Model"),
              year: parseInt(findValue(res.Results, "Model Year")),
              trim: findValue(res.Results, "Trim"),
              vehicleType: findValue(res.Results, "Vehicle Type")
          }
        : null
}

export const apiCheck = async (vin: string): Promise<CarInfo> =>
    convert(await get<VinCheckResponse>("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/" + vin, { format: "json" }))

const findValue = (results: VinResultEntry[], variable: string): string => {
    const result = results.find(result => result.Variable === variable)
    return result ? result.Value : null
}
