import { get } from "../utils/https"

// const invalidChars = new RegExp(/[I]/, "g")
export const filter = (vin: string) =>
    vin
        .toUpperCase()
        .replace("IOQ", "")
        .substring(0, 17)

export const validate = (vin: string): string => vin.length !== 17 && "17 chars expected"

export const convert = (res: VinCheckResponse): CarInfo => {
    const results = res && res.Results
    return results && results.length > 0
        ? {
              make: findValue(results, "Make"),
              model: findValue(results, "Model"),
              year: parseInt(findValue(results, "Model Year"), 10),
              trim: findValue(results, "Trim"),
              vehicleType: findValue(results, "Vehicle Type")
          }
        : null
}

export const apiCheck = async (vin: string): Promise<CarInfo> =>
    convert(await get<VinCheckResponse>("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/" + vin, { format: "json" }))

const findValue = (results: VinResultEntry[], variable: string): string => {
    const item = results.find(result => result.Variable === variable)
    return item ? item.Value : null
}
