#version 400

uniform mat4 u_pm;
uniform mat4 u_vm;
uniform vec3 lightDir;
uniform vec3 p_Pos;
uniform vec3 p_Rot;
 
layout( location = 0 ) out vec4 fragcolour;
 
in vec3 v_norm;
in vec4 v_pos;
 
void main() 
{
 
	vec3 n = normalize(mat3(u_vm) * v_norm);      // convert normal to view space
	vec3 p = vec3((u_pm) * v_pos);                // position in clip space
	vec3 v = normalize(p);                        // normalised eye vector
	vec3 posRotColour;
	float vdn = 0.6 - max(dot(v, n), 0.0);        // the rim contribution
	
	float intensity;
	vec4 colour;
	intensity = dot(lightDir,v_norm);

	if (intensity > 0.95)
		colour = vec4(1.0,0.5,0.5,1.0);
	else if (intensity > 0.5)
		colour = vec4(0.6,0.3,0.3,1.0);
	else if (intensity > 0.25)
		colour = vec4(0.4,0.2,0.2,1.0);
	else
		colour = vec4(0.2,0.1,0.1,1.0);

	posRotColour = vec3(colour.x,colour.y,colour.z) + ((p_Pos + p_Rot + p) * vec3 (-0.1,0.4,-0.1));
	fragcolour.rgb = vec3(smoothstep(0.5, 0.9, vdn)) + posRotColour;//+ (p_Rot*0.5);//vec3((0.1*p.x),(-0.6*p.y),(-0.3*p.z));
	fragcolour.a = 0.6; 
}