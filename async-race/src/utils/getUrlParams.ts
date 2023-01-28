import { IUrlParams } from "../types/IUrlParams"

export function getUrlParams(url:string): IUrlParams {
	let hashPage = url.slice(1)
	return {hashPage}
}