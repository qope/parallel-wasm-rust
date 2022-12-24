use rayon::prelude::*;
use wasm_bindgen::prelude::*;
pub use wasm_bindgen_rayon::init_thread_pool;

#[wasm_bindgen]
pub fn sum(numbers: &[i32]) -> i32 {
    numbers.par_iter().sum()
}
