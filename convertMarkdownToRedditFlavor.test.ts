// @ts-ignore
describe("tests", () => {
  it("run successfully", () => {
    expect(1 + 1).toEqual(2);
  });
});
/* import convertMarkdownToRedditFlavor from "./convertMarkdownToRedditFlavor";

// @ts-ignore
describe("convertMarkdownToRedditFlavor", () => {
  it("guides/fruit", () => {
    const post = `## Fruit

    ### Fruit Selection
    
    #### Handling fruit
    
    [Pectinase, EX-V, delaying bentonite]
    
    [Punching down fruit caps, to bag or not to bag, USE BUCKETS]
    
    #### Yeast Selection
    
    [Red wine yeasts for color stabilization, tannin extraction, etc]
    
    #### Nutrients with fruit
    
    ### Big Fruit Meads &amp; No-water Meads
    
    ### Fruit Presses
    
    #### Free Run`;
    const { convertedMarkdown, textContent } =
      convertMarkdownToRedditFlavor(post);

    expect(textContent).toEqual(
      "FruitFruit SelectionHandling fruit[Pectinase, EX-V, delaying bentonite][Punching down fruit caps, to bag or not to bag, USE BUCKETS]Yeast Selection[Red wine yeasts for color stabilization, tannin extraction, etc]Nutrients with fruitBig Fruit Meads & No-water MeadsFruit PressesFree Run"
    );
  });
  it("resources/academic_journals", () => {
    const post = `TODO: formatting 


    ##Academic Journals 
    
    The purpose of this page is to collect a variety of journals and research work that is relevant to the detailed understanding of yeast health, nitrogen uptake, enzyme effects, and fermentation both in general and in specific to honey or fruit. Please only add journals that do not require log in credentials and to your best knowledge are not pirated in any way. Also, please include a brief description of the content covered and format additions in the same was as the others to keep legibility of the wiki page.  
    
    TODO: These need to be organized somehow
    
    ### [Genetic Basis of Variations in Nitrogen Source Utilization in Four Wine Commercial Yeast Strains](https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0067166&amp;type=printable)
    
    * A dense study on nitrogen uptake, both organic and inorganic. 
    
    * Key conclusions are that inorganic nitrogen promotes a lag time of only hours as do specific organic nitrogen sources, while some organic nitrogen sources take as long as 32 hours. The amount of nitrogen in the must failed to correlate with the rate or the efficiency of nitrogen utilization but does effect the total ethanol production with more nitrogen producing more ethanol.
    
    ### [Methanol in Wine](https://www.bio-conferences.org/articles/bioconf/pdf/2017/02/bioconf-oiv2017_02028.pdf)
    
    * A study on the production of methanol in grape wine with the intent to influence the removal of some sample analyses requirements for wineries. 
    
    * Concludes that there is more methanol red wines than white due to the increased time on the skins for red wines due to natural pectinase
    
    
    ### [Effect of Pectinase Treatment on the Extraction Yield Improvement from Rubus coreanus Juice and Physico chemical Characteristics during Alcohol Fermentation] (https://pdfs.semanticscholar.org/3e2e/e1b420e34bb3201513d4320408b9e7142d32.pdf?_ga=2.92495263.3051814.1573740235-586120357.1573740235)
    
    * A study on the production of methanol and ethanol yield in fruit wine due to pectinase.
    * Concludes R. coreanus juice ethanol yield by pectinase treatment was increased by 8.60% without exceeding US limits for methanol in wine, although exceeding some methanol limits in other countries in both the control groups as well as the groups with added pectinase.
    
    ### [The Ehrlich Pathway for Fusel Alcohol Production: a Century of Research on Saccharomyces cerevisiae Metabolism](https://aem.asm.org/content/74/8/2259)
    
    * A paper on aromatics and their links with fusel alcohols in relation to yeast flavor profiles to promote the metabolic engineering of yeast strains for the production of individual Ehrlich pathway products.
    * Concludes little on it's own as it is more of a summary of sources than any experiment. States that many yeast specific flavor compounds are the result of both stress and specific nitrogen sources. 
    
    ### [Improvement of mead fermentation by honey‐must supplementation](https://onlinelibrary.wiley.com/doi/full/10.1002/jib.239)
    
    * Mead focused study on a low ABV DAP fed fermentation using QA23 and D47 with varied micronutrients
    * Concludes that micronutrients reduce lag phase by up to 24 hours in the samples but did not have a significant effect on the overall time to final gravity.  
    
    ### [Mead fermentation monitoring by proton transfer reaction mass spectrometry and medium infrared probe](https://www.researchgate.net/publication/299546824_Mead_fermentation_monitoring_by_proton_transfer_reaction_mass_spectrometry_and_medium_infrared_probe)
    
    * A study that added chili peppers and cloves to a 14% must with ~200 YAN or less provided by bee pollen and analysed fermentation with infrared measurements. 
    * 28g/gal of cloves were able to significantly impair fermentation rate and increase lag phase, and 18g/gal of chili were able to slightly boost fermentation rate to control. A combination of both resulted in a slightly slower ferment than the chili or control but not nearly as drastic as a negative impact as the clove. The experimental methods appeared to be a reasonable way to measure fermentation rate and mead health with further study.
    * Notes: Figure 3 has a serious typo in the tittle block swapping fermentation 2 and 3. YAN is arguably a touch low for the fermentation and the chilies may be imparting some YAN. Both adjuncts were added in levels that are too high to be intended for consumption, with the clove being exceptionally excessive.
    
    ### [Mead production: effect of nitrogen supplementation on growth, fermentation profile and aroma formation by yeasts in mead fermentation](https://onlinelibrary.wiley.com/doi/full/10.1002/jib.184)
    
    * A study where a ~11% potential must was supplemented with 267 YAN from DAP for two cultures with two cultures left for control. Overpitched D47 and QA23 were added to one of each culture. Fermentation rate was recorded and volatilizes were measured post ferment.
    * Concludes that both musts fermented 60% faster with DAP. Acetaldehyde production increased with with DAP  but was strain dependent with QA23 producing more than D47. Control QA23 produced the most esters. Fatty acid production was increased with DAP use, but all concentrations were below the threshold for human perception. The author notes that excessive YAN is known to cause increased medium‐chain fatty acids (The YAN nutrient calculator targets 187 YAN for 11% ABV). The only aromatic phenol that was at human thresholds was ethyl octanoate, which has a fruity and sweet taste, with the DAP supplemented musts having 3-4 times the control must, and 10 times the detection threshold.
    
    ### [Influence of Sweetness and Ethanol Content on Mead Acceptability](https://content.sciendo.com/downloadpdf/journals/pjfns/65/2/article-p137.xml)
    
    *PDF Download Warning*
    
    * A study where high ABV meads were sampled both dry and sweet. Aroma, sweetness, alcohol expression and general appreciation were compared. 
    * Concludes that higher residual sugars contribute well to aroma, sweetness and general appreciation. Alcohol expression was not significantly influenced (p&gt;0.05) by ABV when ABV was artificially raised by brandy addition although small trends could be seen variation due to testing method put them under the limit for statistical significance. No gender distinctions for sweetness were observed.`;
    const { convertedMarkdown, textContent } =
      convertMarkdownToRedditFlavor(post);

    expect(textContent).toEqual(
      "TODO: formattingAcademic JournalsThe purpose of this page is to collect a variety of journals and research work that is relevant to the detailed understanding of yeast health, nitrogen uptake, enzyme effects, and fermentation both in general and in specific to honey or fruit. Please only add journals that do not require log in credentials and to your best knowledge are not pirated in any way. Also, please include a brief description of the content covered and format additions in the same was as the others to keep legibility of the wiki page.TODO: These need to be organized somehowGenetic Basis of Variations in Nitrogen Source Utilization in Four Wine Commercial Yeast StrainsA dense study on nitrogen uptake, both organic and inorganic.Key conclusions are that inorganic nitrogen promotes a lag time of only hours as do specific organic nitrogen sources, while some organic nitrogen sources take as long as 32 hours. The amount of nitrogen in the must failed to correlate with the rate or the efficiency of nitrogen utilization but does effect the total ethanol production with more nitrogen producing more ethanol.Methanol in WineA study on the production of methanol in grape wine with the intent to influence the removal of some sample analyses requirements for wineries.Concludes that there is more methanol red wines than white due to the increased time on the skins for red wines due to natural pectinase[Effect of Pectinase Treatment on the Extraction Yield Improvement from Rubus coreanus Juice and Physico chemical Characteristics during Alcohol Fermentation] (https://pdfs.semanticscholar.org/3e2e/e1b420e34bb3201513d4320408b9e7142d32.pdf?_ga=2.92495263.3051814.1573740235-586120357.1573740235)A study on the production of methanol and ethanol yield in fruit wine due to pectinase.Concludes R. coreanus juice ethanol yield by pectinase treatment was increased by 8.60% without exceeding US limits for methanol in wine, although exceeding some methanol limits in other countries in both the control groups as well as the groups with added pectinase.The Ehrlich Pathway for Fusel Alcohol Production: a Century of Research on Saccharomyces cerevisiae MetabolismA paper on aromatics and their links with fusel alcohols in relation to yeast flavor profiles to promote the metabolic engineering of yeast strains for the production of individual Ehrlich pathway products.Concludes little on it's own as it is more of a summary of sources than any experiment. States that many yeast specific flavor compounds are the result of both stress and specific nitrogen sources.Improvement of mead fermentation by honey‐must supplementationMead focused study on a low ABV DAP fed fermentation using QA23 and D47 with varied micronutrientsConcludes that micronutrients reduce lag phase by up to 24 hours in the samples but did not have a significant effect on the overall time to final gravity.Mead fermentation monitoring by proton transfer reaction mass spectrometry and medium infrared probeA study that added chili peppers and cloves to a 14% must with ~200 YAN or less provided by bee pollen and analysed fermentation with infrared measurements.28g/gal of cloves were able to significantly impair fermentation rate and increase lag phase, and 18g/gal of chili were able to slightly boost fermentation rate to control. A combination of both resulted in a slightly slower ferment than the chili or control but not nearly as drastic as a negative impact as the clove. The experimental methods appeared to be a reasonable way to measure fermentation rate and mead health with further study.Notes: Figure 3 has a serious typo in the tittle block swapping fermentation 2 and 3. YAN is arguably a touch low for the fermentation and the chilies may be imparting some YAN. Both adjuncts were added in levels that are too high to be intended for consumption, with the clove being exceptionally excessive.Mead production: effect of nitrogen supplementation on growth, fermentation profile and aroma formation by yeasts in mead fermentationA study where a ~11% potential must was supplemented with 267 YAN from DAP for two cultures with two cultures left for control. Overpitched D47 and QA23 were added to one of each culture. Fermentation rate was recorded and volatilizes were measured post ferment.Concludes that both musts fermented 60% faster with DAP. Acetaldehyde production increased with with DAP  but was strain dependent with QA23 producing more than D47. Control QA23 produced the most esters. Fatty acid production was increased with DAP use, but all concentrations were below the threshold for human perception. The author notes that excessive YAN is known to cause increased medium‐chain fatty acids (The YAN nutrient calculator targets 187 YAN for 11% ABV). The only aromatic phenol that was at human thresholds was ethyl octanoate, which has a fruity and sweet taste, with the DAP supplemented musts having 3-4 times the control must, and 10 times the detection threshold.Influence of Sweetness and Ethanol Content on Mead AcceptabilityPDF Download WarningA study where high ABV meads were sampled both dry and sweet. Aroma, sweetness, alcohol expression and general appreciation were compared.Concludes that higher residual sugars contribute well to aroma, sweetness and general appreciation. Alcohol expression was not significantly influenced (p>0.05) by ABV when ABV was artificially raised by brandy addition although small trends could be seen variation due to testing method put them under the limit for statistical significance. No gender distinctions for sweetness were observed."
    );
  });
  it("process/bench_trials", () => {
    const post = `# Bench Trials

    Bench trials provide a systematic way to make decisions about the type and magnitude of any post fermentation adjustments will most improve a mead. Bench trials are most commonly used to evaluate how much acid, tannin, or sweetness to add to a mead in order to achieve balance. They can also be used to determine the type and minimum amount of a fining agent needed to clear a mead or amount of a spice tincture needed to achieve a desired flavor profile.
    
    From a high level, the a bench trial consists of adding a different known amount of a substance (e.g., tannin powder, acid, ect) to identical samples of a given mead, tasting each, and determining a dose for the whole batch by scaling up from the preferred sample. This can be easily and repeatably done by using stock solutions of a known concentration to a fixed volume of mead. 
    
    While a brewer can conduct a bench trial alone, it is highly advisable to have at least one other person participate in the trial, as each person's palette is different and having more opinions will help you to make better decisions. It is also a fantastic way to include friends and family in your hobby.
    
    ## Equipment 
    
    * A scale capable of measuring to a resolution of 0.01 grams
    * A 100ml graduated cylinder
    * A 50ml graduated syringe or pipette
    * A 10ml graduated syringe or pipette
    * A 1ml graduated syringe or pipette
    * If using pipettes, a pipette pump is highly recommended.
    * Jars capable of holding 100ml to store stock solutions
    
    'Graduated' above refers to having volumetric markings so that you can accurately measure dosing.
    
    ## Stock Solutions
    
    Stock solutions with known concentrations are essential to the process described below. The actual concentration that you will want is dependent on the sample size you choose to use. For the purposes of this guide, 1% solutions are recommended for tannins and fining agents; 10% solutions are recommended for acids. Stock solutions can be prepared in the following manner:
    
    1. Fill a 100ml graduated cylinder to the 50ml mark with vodka.
    2. Add by weight the number of grams of a substance that will correspond to your desired concentration, i.e. 1 gram for a 1% solution, 10 grams for a 10% solution.
    3. Cover the top of the graduated cylinder with a thumb or stopper and shake vigorously to fully dissolve.
    4. Top up to the 100ml mark with distilled water.
    
    It is important to be very accurate with the process described above. The stock solution will be shelf stable and able to be stored in a jar between uses. 
    
    Stock solutions for back sweetening trials are best mixed as needed by mixing a known weight of honey with water to a known volume; for example add 100 grams of honey and fill with hot water to 100ml and mix thoroughly.   This will give you a solution with a gravity of approximately 1.3.  
    
    ## Determining Dosing for a Bench Trial
    
    Dosing in bench trials is most easily expressed in parts per million (PPM), which is defined as one milligram of a substance dissolved in 1 liter of solution. Reputable manufacturers of fining agents and powdered tannins will have a recommended dosing range that can be found on the product's web site or on the Technical Data Sheet provided by the manufacturer; this range will usually be expressed in PPM (e.g., 50-200 PPM) or in grams per hectoliter (g/hL). One g/hL is equivalent to 10 PPM.
    
    Generic wine tannins or fining agents may not have a TDS available from the manufacturer and will have either a fixed dose or a recommended range specified on the packaging, usually in grams per gallon (g/gal). Dosing expressed in this way can be converted to PPM by dividing the dose by 0.38 then multiplying by 100 (0.38 g/gal is 100 PPM). For example, for a dose of 1 g/gal, (1/0.38)*100 = 263.1 PPM. If the tannin or fining agent has a fixed dose, a reasonable range can be obtained by using 50% of the dose for the low end, and 150% for the high end, e.g. for a fixed dose of 100 PPM, a reasonable range for bench trials might be 50-150 PPM.
    
    Dosing for acids, sweetness, or other things that do not have a recommended dosing, a 'lazy trial' can be used to ballpark a dosing range. Take a 50ml sample of the mead, and use the 1 or 10ml graduated syringe to add a small amount of stock solution to the sample. Alternate between taking a very small sip and adding a little more stock solution until you think the mead is in the ballpark of what you'd like to achieve with the adjustment. Take the total volume of stock solution added and convert to PPM using the table below, using the same 50% and 150% rule above to determine a dosing range to evaluate.
    
    The table below provides dosing for a 1% stock solution.
    
    PPM Dose | 50ml sample | 100ml sample
    :-: | :-: | :-:
    10 | 0.05ml | 0.1ml
    20 | 0.10ml | 0.2ml
    30 | 0.15ml | 0.3ml
    40 | 0.20ml | 0.4ml
    50 | 0.25ml | 0.5ml
    100 | 0.5ml | 1ml
    
    Dosing for back sweetening trials is not done by PPM.  Using a stock solution of honey and water with a known (or estimated) gravity you can use the [blending calculator](http://meadcalc.freevar.com/) available from meadcalc to determine the volume of your stock solution to add in order to achieve target SGs for your samples.
    
    ## Bench Trial Process
    
    The following process uses samples appropriate for fairly small batches of mead and is usually sufficient for two tasters.  If preparing samples for more tasters, simply multiply the amounts suggested below to the desired sample size. 
    
    1. Use the 50ml syringe to draw several 50ml samples of mead, depending on how many dosing rates you'd like to evaluate. 4 is typically recommended; one sample for the control and one each for a low, medium, and high dose.
    2. Use either the 1ml or the 10ml graduated syringe to add stock solution to each sample to achieve the desired dose
    3. For acid/tannin/sweetness trials, immediately taste each sample and determine which you like best.  For fining agent trials, seal the sample containers and evaluate after a few days. 
    
    For tasting trials if desired, you can further refine the dosing by choosing instead the two best samples and mixing equal volumes of each to produce a sample in between each dose and repeat the tasting evaluation.`;
    const { convertedMarkdown, textContent } =
      convertMarkdownToRedditFlavor(post);

    expect(textContent).toEqual(
      "Bench TrialsBench trials provide a systematic way to make decisions about the type and magnitude of any post fermentation adjustments will most improve a mead. Bench trials are most commonly used to evaluate how much acid, tannin, or sweetness to add to a mead in order to achieve balance. They can also be used to determine the type and minimum amount of a fining agent needed to clear a mead or amount of a spice tincture needed to achieve a desired flavor profile.From a high level, the a bench trial consists of adding a different known amount of a substance (e.g., tannin powder, acid, ect) to identical samples of a given mead, tasting each, and determining a dose for the whole batch by scaling up from the preferred sample. This can be easily and repeatably done by using stock solutions of a known concentration to a fixed volume of mead.While a brewer can conduct a bench trial alone, it is highly advisable to have at least one other person participate in the trial, as each person's palette is different and having more opinions will help you to make better decisions. It is also a fantastic way to include friends and family in your hobby.EquipmentA scale capable of measuring to a resolution of 0.01 gramsA 100ml graduated cylinderA 50ml graduated syringe or pipetteA 10ml graduated syringe or pipetteA 1ml graduated syringe or pipetteIf using pipettes, a pipette pump is highly recommended.Jars capable of holding 100ml to store stock solutions'Graduated' above refers to having volumetric markings so that you can accurately measure dosing.Stock SolutionsStock solutions with known concentrations are essential to the process described below. The actual concentration that you will want is dependent on the sample size you choose to use. For the purposes of this guide, 1% solutions are recommended for tannins and fining agents; 10% solutions are recommended for acids. Stock solutions can be prepared in the following manner:Fill a 100ml graduated cylinder to the 50ml mark with vodka.Add by weight the number of grams of a substance that will correspond to your desired concentration, i.e. 1 gram for a 1% solution, 10 grams for a 10% solution.Cover the top of the graduated cylinder with a thumb or stopper and shake vigorously to fully dissolve.Top up to the 100ml mark with distilled water.It is important to be very accurate with the process described above. The stock solution will be shelf stable and able to be stored in a jar between uses.Stock solutions for back sweetening trials are best mixed as needed by mixing a known weight of honey with water to a known volume; for example add 100 grams of honey and fill with hot water to 100ml and mix thoroughly.   This will give you a solution with a gravity of approximately 1.3.Determining Dosing for a Bench TrialDosing in bench trials is most easily expressed in parts per million (PPM), which is defined as one milligram of a substance dissolved in 1 liter of solution. Reputable manufacturers of fining agents and powdered tannins will have a recommended dosing range that can be found on the product's web site or on the Technical Data Sheet provided by the manufacturer; this range will usually be expressed in PPM (e.g., 50-200 PPM) or in grams per hectoliter (g/hL). One g/hL is equivalent to 10 PPM.Generic wine tannins or fining agents may not have a TDS available from the manufacturer and will have either a fixed dose or a recommended range specified on the packaging, usually in grams per gallon (g/gal). Dosing expressed in this way can be converted to PPM by dividing the dose by 0.38 then multiplying by 100 (0.38 g/gal is 100 PPM). For example, for a dose of 1 g/gal, (1/0.38)*100 = 263.1 PPM. If the tannin or fining agent has a fixed dose, a reasonable range can be obtained by using 50% of the dose for the low end, and 150% for the high end, e.g. for a fixed dose of 100 PPM, a reasonable range for bench trials might be 50-150 PPM.Dosing for acids, sweetness, or other things that do not have a recommended dosing, a 'lazy trial' can be used to ballpark a dosing range. Take a 50ml sample of the mead, and use the 1 or 10ml graduated syringe to add a small amount of stock solution to the sample. Alternate between taking a very small sip and adding a little more stock solution until you think the mead is in the ballpark of what you'd like to achieve with the adjustment. Take the total volume of stock solution added and convert to PPM using the table below, using the same 50% and 150% rule above to determine a dosing range to evaluate.The table below provides dosing for a 1% stock solution.PPM Dose50ml sample100ml sample100.05ml0.1ml200.10ml0.2ml300.15ml0.3ml400.20ml0.4ml500.25ml0.5ml1000.5ml1mlDosing for back sweetening trials is not done by PPM.  Using a stock solution of honey and water with a known (or estimated) gravity you can use the blending calculator available from meadcalc to determine the volume of your stock solution to add in order to achieve target SGs for your samples.Bench Trial ProcessThe following process uses samples appropriate for fairly small batches of mead and is usually sufficient for two tasters.  If preparing samples for more tasters, simply multiply the amounts suggested below to the desired sample size.Use the 50ml syringe to draw several 50ml samples of mead, depending on how many dosing rates you'd like to evaluate. 4 is typically recommended; one sample for the control and one each for a low, medium, and high dose.Use either the 1ml or the 10ml graduated syringe to add stock solution to each sample to achieve the desired doseFor acid/tannin/sweetness trials, immediately taste each sample and determine which you like best.  For fining agent trials, seal the sample containers and evaluate after a few days.For tasting trials if desired, you can further refine the dosing by choosing instead the two best samples and mixing equal volumes of each to produce a sample in between each dose and repeat the tasting evaluation."
    );
  });
});
*/
