import React from "react";
import { skillGroups } from "./MySkills";
import SkillCard from "./SkillArray";

const SkillGroups = () => (
  <div className="bg-cyan-50 shadow-md p-4 rounded-xl max-w-6xl mx-auto md:p-5 opacity-90">
    <div className="mb-3 flex text-3xl gap-2 font-bold">
      <div className="bg-neutral-800 h-[36px] w-2"></div>
      <h2>Skill 🥏</h2>
    </div>
    {skillGroups.map((group) => (
      <div key={group.name} className="mb-10">
        <h3 className="text-xl font-bold mb-4">{group.name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {group.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkillGroups;
