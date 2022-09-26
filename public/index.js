let json_string = undefined;
function page_start() {
  custom_file = document.getElementById('custom_file');
  custom_file.addEventListener("change", handleFiles, false);
  fetch_url("install");
}

function handle_JSON_file(json_string, name) {
  const json = JSON.parse(json_string);
  const values = json.values[name];
  const form = document.createElement("form");
  form.id = name;
  const inputs = document.createElement("div");
  inputs.classList.add("inputs");

  if (values === undefined) {
    content.innerHTML = `could not find ${name} in values.json; see console for what I did find`;
    console.log(json);
    throw new Error(`could not find ${name} in values.json; see above for what I did find`);
  }

  values.forEach((value) => {
    switch (value.type) {
      case "title":
        inputs.innerHTML += `<h2>${value.name}</h2>`;
        break;
      case "winget":
        inputs.innerHTML += `<label><input value="${value.value}" type="checkbox"${(value.checked ? " checked" : "")}>${value.name}</label>`;
        break;
      default:
      // code block
    }
  });
  form.innerHTML += inputs.outerHTML;
  form.innerHTML += `<button type="button" onclick="do_action('${name}')">${name}</button>`;
  content.innerHTML = form.outerHTML;
}

function handleFiles() {
  const file = this.files[0];
  const button = document.getElementById('custom_file_button');
  if (file?.type !== "application/json") throw new Error("File is not JSON");
  button.innerHTML = file.name;
  const reader = new FileReader();
}



function fetch_url(name) {
  const url = "default/values.json";
  const content = document.getElementById("content");
  content.innerHTML = "";
  if (json_string !== undefined) {
    handle_JSON_file(json_string, name);
    return;
  };
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      content.innerHTML += "I looked up '" + url + "', did you mean to do that?<br>";
      content.innerHTML += "Error Status:" + response.status + "; See console for more details.";
      console.log(response);
      throw new Error(response.statusText);
    })
    .then(handle_JSON_file(response, name))
    .catch((error) => {
      console.error(error);
    });
}

function do_action(type) {
  const form = document.getElementById(type);
  switch (type) {
    case "install":

      break;
    case "tweaks":

      break;
    case "config":

      break;
    case "updates":

      break;
    default:
    // code block
  }
  console.log(form);
}

document.addEventListener("DOMContentLoaded", page_start);