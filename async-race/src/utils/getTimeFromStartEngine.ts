import { IEngine } from "../types/IEngine";

export const getTimeFromStartEngine = (startEngine: IEngine) => {
	const time = Math.round(startEngine.distance / startEngine.velocity)
	return time;
};