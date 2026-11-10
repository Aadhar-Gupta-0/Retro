'use strict';
const statusEl=document.getElementById('status');
const entriesEl=document.getElementById('entries');
async function refresh() {
  statusEl.textContent='Reading local metadata…';
  entriesEl.replaceChildren();
  try {
    const response=await fetch('./FUNDING.json',{cache:'no-store'});
    if (!response.ok) throw new Error('Could not load FUNDING.json');
    const rows=FundingInspector.validateFunding(await response.json());
    for(const {network,owner} of rows) {
      const article=document.createElement('article');
      const title=document.createElement('h2');title.textContent=network;
      const label=document.createElement('p');label.textContent='Configured Drips owner address';
      const code=document.createElement('code');code.textContent=owner;
      const copy=document.createElement('button');copy.textContent='Copy address';
      copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(owner);copy.textContent='Copied';}catch(_){copy.textContent='Copy failed';}});
      article.append(title,label,code,copy);entriesEl.append(article);
    }
    statusEl.textContent=rows.length+' network records loaded';
  } catch(error) {statusEl.textContent='Unable to load funding metadata';const p=document.createElement('p');p.textContent=error.message;entriesEl.append(p);}
}
document.getElementById('refresh').addEventListener('click',refresh);
refresh();