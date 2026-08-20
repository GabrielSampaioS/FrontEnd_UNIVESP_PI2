import Label from './Label';


function FormField({label, htmlFor, children}){
    return(
        <fieldset className="form-field">
            <Label htmlFor={htmlFor}>
                {label}
            </Label>
            {children}
        </fieldset>
    )
}

export default FormField;