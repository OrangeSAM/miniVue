import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
	private _value: any
	public dep
	private _rawValue: any
	constructor(value) {
		this._rawValue = value
		// 1. 看看value 是不是对象
		this._value = convert(value)
		this.dep = new Set()
	}
	get value() {
		trackRefValue(this)
		return this._value
	}
	set value(val) {
		// 一定是先去修改了value的值，再触发依赖
		if (hasChanged(val, this._rawValue)) {
			this._rawValue = val
			this._value = convert(val)
			triggerEffects(this.dep)
		}
	}
}


function convert(val) {
	return isObject(val) ? reactive(val) : val
}

function trackRefValue(ref) {
	if (isTracking()) {
		trackEffects(ref.dep)
	}
}

export function ref(value) {
	return new RefImpl(value)
}