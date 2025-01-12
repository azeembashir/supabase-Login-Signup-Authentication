const { createClient } = supabase;
const supabase_Url = "https://thmfpqgbrfshbrfyfpvi.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWZwcWdicmZzaGJyZnlmcHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2OTAyNTcsImV4cCI6MjA1MjI2NjI1N30.rABP5k5M8qjbp8XSnaSrtaYONAnCgf5cDwzVfD6au38";
const supabase_config = createClient(supabase_Url, supabase_key);
// console.log("config=>",supabase_config);

const email = document.getElementById("signup_email");
const password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

signup_btn.addEventListener("click", async () => {
  const email = document.getElementById("signup_email");
  const password = document.getElementById("signup_password");

  try {
    const { data, error } = await supabase_config.auth.signUp({
      email: email.value,
      password: password.value,
    });

    console.log("data=>", data);
    console.log("error=>", error);
    document.getElementById("signup_cont").style.display = "none";
    document.getElementById("signin_cont").style.display = "block";
    document.getElementById("signup_email").value = "";
    document.getElementById("signup_password").value = "";
  } catch (e) {
    console.log("error=>", e);
  }
});

const signin_btn = document.getElementById("signin_btn");
signin_btn.addEventListener("click", async () => {
  try {
    const { data, error } = await supabase_config.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    document.getElementById("auth_container").style.display = "none";
    document.getElementById("user_container").style.display = "block";
    document.getElementById("signup_email").value = "";
    document.getElementById("signup_password").value = "";
  } catch (e) {
    console.log(e);
  }
});

const logout_btn = document.getElementById("logout_btn");
logout_btn.addEventListener("click", async () => {
  try {
    const { error } = await supabase_config.auth.signOut();
    document.getElementById("user_container").style.display = "none";
    document.getElementById("auth_container").style.display = "block";
  } catch (e) {
    console.log(e);
  }
});

// Toggle between Signup and Signin
document.querySelector(".toggle a").addEventListener("click", (e) => {
  e.preventDefault();
  signup_cont.style.display =
    signup_cont.style.display === "none" ? "block" : "none";
  signin_cont.style.display =
    signin_cont.style.display === "block" ? "none" : "block";
});

document.querySelector(".signup_toggle a").addEventListener("click", (e) => {
  document.getElementById("signin_cont").style.display = "none";
  document.getElementById("signup_cont").style.display = "block";
});
