const programming_languages =[
    "python",
    "javascript",
    "java",
    "swift",
    "react",
    "vue",
    "cpp",
    "fortran",
    "kotlin",
    "ruby",
    "php",
    "golang",
    "csharp",
    "sql",
    "html"
]

function randomWord(){
    return programming_languages[Math.floor(Math.random()*programming_languages.length)]
}
export { randomWord }