export interface Options {
	/**
	 * (Default: true) Boolean. If a request 503s and wait_for_model is set to false, the request will be retried with the same parameters but with wait_for_model set to true.
	 */
	retry_on_error?: boolean;
	/**
	 * (Default: true). Boolean. There is a cache layer on the inference API to speedup requests we have already seen. Most models can use those results as is as models are deterministic (meaning the results will be the same anyway). However if you use a non deterministic model, you can set this parameter to prevent the caching mechanism from being used resulting in a real new query.
	 */
	use_cache?: boolean;
	/**
	 * (Default: false). Boolean. Do not load the model if it's not already available.
	 */
	dont_load_model?: boolean;
	/**
	 * (Default: false). Boolean to use GPU instead of CPU for inference (requires Startup plan at least).
	 */
	use_gpu?: boolean;

	/**
	 * (Default: false) Boolean. If the model is not ready, wait for it instead of receiving 503. It limits the number of requests required to get your inference done. It is advised to only set this flag to true after receiving a 503 error as it will limit hanging in your application to known places.
	 */
	wait_for_model?: boolean;
	/**
	 * Custom fetch function to use instead of the default one, for example to use a proxy or edit headers.
	 */
	fetch?: typeof fetch;
}

export type InferenceTask = "text-classification" | "feature-extraction" | "sentence-similarity";

export interface BaseArgs {
	/**
	 * The access token to use. Without it, you'll get rate-limited quickly.
	 *
	 * Can be created for free in hf.co/settings/token
	 */
	accessToken?: string;
	/**
	 * The model to use. Can be a full URL for HF inference endpoints.
	 */
	model: string;
}

export type RequestArgs = BaseArgs &
	({ data: Blob | ArrayBuffer } | { inputs: unknown }) & {
		parameters?: Record<string, unknown>;
		accessToken?: string;
	};
